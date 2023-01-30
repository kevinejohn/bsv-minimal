import { BufferReader, BufferChunksReader, Hash } from "./utils";

export default class Header {
  version: Buffer;
  prevHash: Buffer;
  merkleRoot: Buffer;
  time: number;
  bits: Buffer;
  nonce: number;
  buffer: Buffer;
  hash?: Buffer;

  private constructor(br: BufferReader | BufferChunksReader) {
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

  static fromBufferReader(br: BufferReader | BufferChunksReader) {
    const header = new Header(br);
    return header;
  }

  static fromHex(hex: string) {
    const buf = Buffer.from(hex, "hex");
    return Header.fromBuffer(buf);
  }

  toBuffer() {
    return this.buffer;
  }

  toHex() {
    return this.toBuffer().toString("hex");
  }

  getHash(): Buffer;
  getHash<T extends boolean>(hexStr: T): T extends true ? string : Buffer;
  getHash(hexStr = false): string | Buffer {
    if (!this.hash) {
      const buf = this.toBuffer();
      this.hash = Hash.sha256sha256(buf).reverse();
    }

    return hexStr ? this.hash.toString("hex") : this.hash;
  }
}
