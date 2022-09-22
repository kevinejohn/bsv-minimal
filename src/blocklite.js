import Header from "./header";
import Transaction from "./transaction";
import { BufferReader, BufferWriter } from "./utils";

export default class BlockLite {
  static fromBuffer(buf) {
    const br = new BufferReader(buf);
    const block = new BlockLite();
    block.header = Header.fromBufferReader(br);
    block.txids = [];
    block.txCount = br.readVarintNum();
    for (let i = 0; i < block.txCount; i++) {
      const txid = br.read(32);
      block.txids.push(txid);
    }
    block.size = br.pos;
    block.buffer = buf;
    return block;
  }

  static fromBlockBuffer(buf) {
    const br = new BufferReader(buf);
    const block = new BlockLite();
    block.header = Header.fromBufferReader(br);
    block.txids = [];
    block.txCount = br.readVarintNum();
    for (let i = 0; i < block.txCount; i++) {
      const transaction = Transaction.fromBufferReader(br);
      block.txids.push(transaction.getHash());
    }
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
