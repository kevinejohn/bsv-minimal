const { BufferReader, Hash } = require("./utils");

class Header {
  static fromBuffer(buf) {
    const br = new BufferReader(buf);
    return this.fromBufferReader(br);
  }

  static fromBufferReader(br) {
    const header = new Header();
    const startPos = br.pos;
    header.version = br.readReverse(4);
    header.prevHash = br.readReverse(32);
    header.merkleRoot = br.readReverse(32);
    header.time = br.readUInt32LE();
    header.bits = br.readReverse(4);
    header.nonce = br.readUInt32LE();
    header.buffer = br.slice(startPos, br.pos);
    return header;
  }

  toBuffer() {
    return this.buffer;
  }

  getHash() {
    if (!this.hash) {
      const buf = this.toBuffer();
      this.hash = Hash.sha256sha256(buf).reverse();
    }
    return this.hash;
  }
}

module.exports = Header;
