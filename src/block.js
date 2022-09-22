import Transaction from "./transaction";
import Header from "./header";
import BlockLite from "./blocklite";
import { BufferReader, BufferChunksReader, BufferWriter, Hash } from "./utils";

export default class Block {
  constructor(options = {}) {
    this.txRead = 0;
    this.size = 0;
    this.options = options;
    this.merkleArray = [[]];
  }

  static fromBuffer(buf) {
    const br = new BufferReader(buf);
    const block = new Block();
    block.header = Header.fromBufferReader(br);
    block.txCount = br.readVarintNum();
    block.txPos = br.pos;
    block.size = buf.length;
    block.buffer = buf;
    return block;
  }

  static fromBlockLite(blockLite, transactions) {
    const bw = new BufferWriter();
    bw.write(blockLite.header.toBuffer());
    bw.writeVarintNum(blockLite.txCount);
    for (let i = 0; i < blockLite.txCount; i++) {
      if (
        !transactions[i] ||
        Buffer.compare(blockLite.txids[i], transactions[i].getHash()) !== 0
      ) {
        throw new Error(`Invalid transactions`);
      }
      bw.write(transactions[i].toBuffer());
    }
    const buf = bw.toBuffer();
    const block = Block.fromBuffer(buf);
    return block;
  }

  getHash(hexStr = false) {
    if (!this.hash) {
      this.hash = this.header.getHash();
    }
    return hexStr ? this.hash.toString("hex") : this.hash;
  }

  getTransactions() {
    if (this.transactions) return this.transactions;
    this.transactions = [];
    const { txPos, txCount } = this;
    const buf = this.toBuffer();
    const br = new BufferReader(buf);
    br.read(txPos);
    for (let i = 0; i < txCount; i++) {
      const transaction = Transaction.fromBufferReader(br);
      this.transactions.push(transaction);
      this.txRead = i + 1;
    }
    return this.transactions;
  }

  getHeight() {
    // https://en.bitcoin.it/wiki/BIP_0034
    if (Buffer.compare(Buffer.from([0, 0, 0, 1]), this.header.version) === 0) {
      throw Error("No height in v1 blocks");
    }
    const { txPos } = this;
    const buf = this.toBuffer();
    const br = new BufferReader(buf);
    br.read(txPos);
    const transaction = Transaction.fromBufferReader(br);
    return transaction.getCoinbaseHeight();
  }

  validate() {
    if (this.computedMerkleRoot) {
      if (
        Buffer.compare(this.computedMerkleRoot, this.header.merkleRoot) !== 0
      ) {
        throw new Error(`Invalid merkle root!`);
      }
      // console.log(`Merkle root is valid`)
    } else if (this.transactions) {
      for (const transaction of this.transactions) {
        this.addMerkleHash(transaction.getHash());
      }
    } else {
      throw new Error(`Must call addMerkleHash on all transactions first`);
    }
  }

  addMerkleHash(index, hash) {
    const { merkleArray, computedMerkleRoot, txCount } = this;
    if (computedMerkleRoot) return;
    merkleArray[0].push(Buffer.from(hash).reverse());
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
        const concat = Buffer.concat([first, second]);
        const hash = Hash.sha256sha256(concat);
        if (!merkleArray[height + 1]) merkleArray.push([]);
        merkleArray[height + 1].push(hash);
        calculate(height + 1);
      }
    };
    calculate();
  }

  async getTransactionsAsync(callback) {
    const { txPos, txCount, transactions, header, options } = this;
    if (transactions) {
      await callback({
        transactions: transactions.map((tx, index) => {
          if (options.validate) {
            this.addMerkleHash(index, tx.getHash());
          }
          return [index, tx];
        }),
        finished: true,
        started: true,
        header,
      });
    } else if (txPos) {
      const buf = this.toBuffer();
      const br = new BufferReader(buf);
      br.read(txPos);
      if (txCount === 0) {
        await callback({
          transactions: [],
          finished: true,
          started: true,
          header,
        });
      } else {
        for (let index = 0; index < txCount; index++) {
          const transaction = Transaction.fromBufferReader(br);
          this.txRead = index + 1;
          if (options.validate) {
            this.addMerkleHash(index, transaction.getHash());
          }
          const pos = transaction.bufStart;
          const len = transaction.buffer.length;
          await callback({
            transactions: [[index, transaction, pos, len]],
            finished: this.finished(),
            started: index === 0,
            header,
          });
        }
      }
    } else {
      throw new Error(`Did not read block`);
    }
  }

  toBuffer() {
    return this.buffer;
  }

  toBlockLite() {
    return BlockLite.fromBlockBuffer(this.toBuffer());
  }

  finished() {
    if (this.txRead > this.txCount) {
      throw new Error(`Block is corrupted`);
    }
    return this.txCount !== undefined && this.txRead === this.txCount;
  }

  addBufferChunk(buf) {
    // TODO: Detect and stop on corrupt data
    if (!this.br) {
      this.br = new BufferChunksReader(buf);
    } else {
      this.br.append(buf);
    }
    const startPos = this.br.pos;

    if (!this.header) {
      let prePos = this.br.pos;
      try {
        this.header = Header.fromBufferReader(this.br);
      } catch (err) {
        this.br.rewind(this.br.pos - prePos);
      }
    }
    if (this.header && this.txCount === undefined) {
      try {
        this.txCount = this.br.readVarintNum();
      } catch (err) {
        // console.log(err)
      }
    }
    const transactions = [];
    if (this.header && this.txCount !== undefined) {
      let prePos;
      try {
        for (let index = this.txRead; index < this.txCount; index++) {
          prePos = this.br.pos;
          const transaction = Transaction.fromBufferReader(this.br);
          const pos = transaction.bufStart;
          const len = transaction.buffer.length;
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
    }
    this.br.trim();
    this.size = this.br.pos;

    return {
      size: this.size,
      header: this.header,
      height: this.height,
      transactions,
      started: startPos === 0,
      finished: this.finished(),
      bytesRead: this.br.pos - startPos,
      bytesRemaining: this.br.length - this.br.pos,
      txCount: this.txCount,
    };
  }
}
