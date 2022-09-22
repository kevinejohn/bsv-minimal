import { BufferReader, Hash } from "./utils";

export default class Header {
  version: Buffer;
  prevHash: Buffer;
  merkleRoot: Buffer;
  time: number;
  bits: Buffer;
  nonce: number;
  buffer: Buffer;
  hash?: Buffer;

  private constructor(br: BufferReader) {
    const startPos = br.pos;
    this.version = br.readReverse(4);
    this.prevHash = br.readReverse(32);
    this.merkleRoot = br.readReverse(32);
    this.time = br.readUInt32LE();
    this.bits = br.readReverse(4);
    this.nonce = br.readUInt32LE();
    this.buffer = br.slice(startPos, br.pos);
  }

  static fromBuffer(buf: Buffer) {
    const br = new BufferReader(buf);
    return this.fromBufferReader(br);
  }

  static fromBufferReader(br: BufferReader) {
    const header = new Header(br);
    return header;
  }

  toBuffer() {
    return this.buffer;
  }

  getHash(hexStr = false) {
    if (!this.hash) {
      const buf = this.toBuffer();
      this.hash = Hash.sha256sha256(buf).reverse();
    }
    return hexStr ? this.hash.toString("hex") : this.hash;
  }
}
