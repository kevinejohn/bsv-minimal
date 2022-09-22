import { bigIntToNum } from "./bigint";

interface Properties {
  buf: Buffer;
  pos?: number;
}

export default class BufferReader {
  buf;
  pos;

  constructor(buf: Buffer | string | Properties) {
    if (Buffer.isBuffer(buf)) {
      this.buf = buf;
      this.pos = 0;
    } else if (typeof buf === "string") {
      const len = buf.length;
      buf = Buffer.from(buf, "hex");
      if (buf.length * 2 !== len) {
        throw new TypeError("Invalid hex string");
      }
      this.buf = buf;
      this.pos = 0;
    } else if (typeof buf === "object") {
      const obj = buf;
      this.buf = obj.buf;
      this.pos = obj.pos || 0;
    } else {
      throw new TypeError(`Unrecognized argument for BufferReader`);
    }
  }

  slice(i: number, j: number) {
    return this.buf.slice(i, j);
  }

  eof() {
    return this.pos >= this.buf.length;
  }

  finished() {
    return this.eof();
  }

  read(len: number) {
    if (typeof len === "undefined") throw new Error(`Must specify a length`);
    const buf = Buffer.from(this.buf.slice(this.pos, this.pos + len));
    this.pos = this.pos + len;
    return buf;
  }

  readAll() {
    const buf = Buffer.from(this.buf.slice(this.pos, this.buf.length));
    this.pos = this.buf.length;
    return buf;
  }

  readUInt8() {
    const val = this.buf.readUInt8(this.pos);
    this.pos = this.pos + 1;
    return val;
  }

  readUInt16BE() {
    const val = this.buf.readUInt16BE(this.pos);
    this.pos = this.pos + 2;
    return val;
  }

  readUInt16LE() {
    const val = this.buf.readUInt16LE(this.pos);
    this.pos = this.pos + 2;
    return val;
  }

  readUInt32BE() {
    const val = this.buf.readUInt32BE(this.pos);
    this.pos = this.pos + 4;
    return val;
  }

  readUInt32LE() {
    const val = this.buf.readUInt32LE(this.pos);
    this.pos = this.pos + 4;
    return val;
  }

  readInt32LE() {
    const val = this.buf.readInt32LE(this.pos);
    this.pos = this.pos + 4;
    return val;
  }

  readUInt64BE() {
    const bn = this.readUInt64BEBI();
    return bigIntToNum(bn);
  }

  readUInt64LE() {
    const bn = this.readUInt64LEBI();
    return bigIntToNum(bn);
  }

  readUInt64BEBI() {
    const bn = this.buf.readBigUInt64BE(this.pos);
    this.pos = this.pos + 8;
    return bn;
  }

  readUInt64LEBI() {
    const bn = this.buf.readBigUInt64LE(this.pos);
    this.pos = this.pos + 8;
    return bn;
  }

  readVarintNum() {
    const first = this.readUInt8();
    switch (first) {
      case 0xfd:
        return this.readUInt16LE();
      case 0xfe:
        return this.readUInt32LE();
      case 0xff:
        return this.readUInt64LE();
      default:
        return first;
    }
  }

  readVarLengthBuffer() {
    const len = this.readVarintNum();
    const buf = this.read(len);
    if (buf.length !== len) {
      throw new Error(
        `Invalid length while reading varlength buffer. Expected to read: ${len} and read ${buf.length}`
      );
    }
    return buf;
  }

  reverse() {
    this.buf.reverse();
    return this;
  }

  readReverse(len: number) {
    const buf = this.read(len);
    return buf.reverse();
  }
}
