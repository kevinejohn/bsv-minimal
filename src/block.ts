import Transaction from "./transaction";
import Header from "./header";
import { BufferReader, BufferChunksReader, Hash } from "./utils";

export interface BlockOptions {
  validate?: boolean;
}

export type BlockStream = {
  height?: number;
  size: number;
  bytesRead: number;
  bytesRemaining: number;
  txCount: number;
  txRead: number;
  transactions: [number, Transaction, number, number][];
  finished: boolean;
  started: boolean;
  header: Header;
  startDate: number;
};

export default class Block {
  txRead: number;
  size: number;
  options: BlockOptions;
  merkleArray: Buffer[][];
  header?: Header;
  txCount?: number;
  txPos?: number;
  buffer?: Buffer;
  transactions?: Transaction[];
  computedMerkleRoot?: Buffer;
  br?: BufferChunksReader;
  height?: number;
  startDate: number;

  constructor(options: BlockOptions = {}) {
    this.txRead = 0;
    this.size = 0;
    this.options = options;
    this.merkleArray = [[]];
    this.startDate = +new Date();
  }

  static fromBuffer(buf: Buffer) {
    const br = new BufferReader(buf);
    const block = new Block();
    block.header = Header.fromBufferReader(br);
    block.txCount = br.readVarintNum();
    block.txPos = br.pos;
    block.size = buf.length;
    block.buffer = buf;
    return block;
  }

  static fromHex(hex: string) {
    const buf = Buffer.from(hex, "hex");
    return Block.fromBuffer(buf);
  }

  getHash(): Buffer;
  getHash<T extends boolean>(hexStr: T): T extends true ? string : Buffer;
  getHash(hexStr = false) {
    if (!this.header) throw Error("Missing header");
    const hash = this.header.getHash();
    return hexStr ? hash.toString("hex") : hash;
  }

  getTransactions() {
    if (this.transactions) return this.transactions;
    this.transactions = [];
    const { txPos, txCount } = this;
    const buf = this.toBuffer();
    const br = new BufferReader(buf);
    if (!txPos) throw Error("Missing txPos");
    if (!txCount) throw Error("Missing txCount");
    br.read(txPos); // Skip header and txCount
    for (let i = 0; i < txCount; i++) {
      const transaction = Transaction.fromBufferReader(br);
      this.transactions.push(transaction);
      this.txRead = i + 1;
    }
    return this.transactions;
  }

  getHeight() {
    // https://en.bitcoin.it/wiki/BIP_0034
    if (!this.header) throw Error("Missing header");
    if (!this.txPos) throw Error("Missing txPos");
    if (Buffer.compare(Buffer.from([0, 0, 0, 1]), this.header.version) === 0) {
      throw Error("No height in v1 blocks");
    }
    const buf = this.toBuffer();
    const br = new BufferReader(buf);
    br.read(this.txPos); // Skip header and txCount
    const transaction = Transaction.fromBufferReader(br);
    return transaction.getCoinbaseHeight();
  }

  validate() {
    if (this.computedMerkleRoot) {
      if (!this.header) throw Error("Missing header");
      if (
        Buffer.compare(this.computedMerkleRoot, this.header.merkleRoot) !== 0
      ) {
        throw Error(`Invalid merkle root!`);
      }
      // console.log(`Merkle root is valid`)
    } else if (this.transactions) {
      let index = 0;
      for (const transaction of this.transactions) {
        this.addMerkleHash(index++, transaction.getHash());
      }
    } else {
      throw Error(`Must call addMerkleHash on all transactions first`);
    }
  }

  addMerkleHash(index: number, hash: Buffer) {
    const { merkleArray, computedMerkleRoot, txCount } = this;
    if (computedMerkleRoot) return;
    merkleArray[0].push(Buffer.from(hash).reverse());
    if (!txCount) throw Error("Missing txCount");
    const finished = index + 1 >= txCount;

    const calculate = (height = 0) => {
      if (
        finished &&
        merkleArray[height].length === 1 &&
        merkleArray.slice(height).length === 1
      ) {
        this.computedMerkleRoot = merkleArray[height][0].reverse();
        this.merkleArray = [[]];
        this.validate();
        return;
      }

      if (finished || merkleArray[height].length === 2) {
        const first = merkleArray[height].shift();
        const second = merkleArray[height].shift() || first;
        if (first && second) {
          const concat = Buffer.concat([first, second]);
          const hash = Hash.sha256sha256(concat);
          if (!merkleArray[height + 1]) merkleArray.push([]);
          merkleArray[height + 1].push(hash);
          calculate(height + 1);
        }
      }
    };
    calculate();
  }

  async getTransactionsAsync(
    callback: (data: BlockStream) => Promise<void> | void
  ) {
    const { txPos, txCount, size, header, options } = this;
    if (!header) throw Error("Missing header");
    if (!txPos) throw Error("Missing txPos");
    if (!txCount) throw Error("Missing txCount");
    const startDate = +new Date();
    const buf = this.toBuffer();
    const br = new BufferReader(buf);
    br.read(txPos); // Skip header and txCount
    this.txRead = 0;
    for (let index = 0; index < txCount; index++) {
      const transaction = Transaction.fromBufferReader(br);
      this.txRead = index + 1;
      if (options.validate) {
        this.addMerkleHash(index, transaction.getHash());
      }
      const pos = transaction.bufStart;
      const len = transaction.length;
      await callback({
        transactions: [[index, transaction, pos, len]],
        finished: this.finished(),
        started: index === 0,
        header,
        txCount,
        txRead: this.txRead,
        size,
        startDate,
        bytesRead: br.pos,
        bytesRemaining: buf.length - br.pos,
      });
    }
  }

  toBuffer() {
    if (!this.buffer) throw Error("Missing buffer");
    return this.buffer;
  }

  toHex() {
    return this.toBuffer().toString("hex");
  }

  finished() {
    if (this.txCount && this.txRead > this.txCount) {
      throw Error(`Block is corrupted`);
    }
    return this.txCount !== undefined && this.txRead === this.txCount;
  }

  addBufferChunk(buf: Buffer): BlockStream {
    // TODO: Detect and stop on corrupt data
    if (!this.br) {
      this.startDate = +new Date();
      this.br = new BufferChunksReader(buf);
    } else {
      this.br.append(buf);
    }
    const startPos = this.br.pos;
    let started = false;

    if (!this.header) {
      if (this.br.length < 80) throw Error(`buffer too small`);
      this.header = Header.fromBufferReader(this.br);
    }
    if (this.txCount === undefined) {
      this.txCount = this.br.readVarintNum();
      started = true;
    }
    const transactions: [number, Transaction, number, number][] = [];
    let prePos = this.br.pos;
    try {
      for (let index = this.txRead; index < this.txCount; index++) {
        prePos = this.br.pos;
        const transaction = Transaction.fromBufferReader(this.br);
        const pos = transaction.bufStart;
        const len = transaction.length;
        transactions.push([index, transaction, pos, len]);

        if (this.options.validate) {
          this.addMerkleHash(index, transaction.getHash());
        }
        if (
          index === 0 &&
          Buffer.compare(Buffer.from([0, 0, 0, 1]), this.header.version) !== 0
        ) {
          // https://en.bitcoin.it/wiki/BIP_0034
          try {
            this.height = transaction.getCoinbaseHeight();
          } catch (err) {}
        }
        this.txRead = index + 1;
      }
    } catch (err) {
      this.br.rewind(this.br.pos - prePos);
    }
    const finished = this.finished();
    this.br.trim();
    this.size = this.br.pos;

    return {
      startDate: this.startDate,
      size: this.size,
      header: this.header,
      height: this.height,
      transactions,
      started,
      finished,
      bytesRead: this.br.pos - startPos,
      bytesRemaining: this.br.length - this.br.pos,
      txCount: this.txCount,
      txRead: this.txRead,
    };
  }
}
