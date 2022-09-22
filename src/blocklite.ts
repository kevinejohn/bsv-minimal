import Header from "./header";
import Transaction from "./transaction";
import { BufferReader, BufferWriter } from "./utils";

export default class BlockLite {
  header: Header;
  txids: Buffer[];
  txCount: number;
  size: number;
  buffer: Buffer;
  hash?: Buffer;

  private constructor(br: BufferReader, block = false) {
    this.header = Header.fromBufferReader(br);
    this.txids = [];
    this.txCount = br.readVarintNum();

    for (let i = 0; i < this.txCount; i++) {
      if (block) {
        const transaction = Transaction.fromBufferReader(br);
        this.txids.push(transaction.getHash());
      } else {
        const txid = br.read(32);
        this.txids.push(txid);
      }
    }
    this.size = br.pos;
    this.buffer = br.buf;
  }

  static fromBuffer(buf: Buffer) {
    const br = new BufferReader(buf);
    const block = new BlockLite(br);

    return block;
  }

  static fromBlockBuffer(buf: Buffer) {
    const br = new BufferReader(buf);
    const isBlock = true;
    const block = new BlockLite(br, isBlock);
    return block;
  }

  getHash() {
    if (!this.hash) {
      this.hash = this.header.getHash();
    }
    return this.hash;
  }

  toBuffer() {
    if (!this.buffer) {
      const bw = new BufferWriter();
      bw.write(this.header.toBuffer());
      bw.writeVarintNum(this.txCount);
      for (const txid of this.txids) {
        bw.write(txid);
      }
      this.buffer = bw.toBuffer();
      this.size = this.buffer.length;
    }
    return this.buffer;
  }
}
