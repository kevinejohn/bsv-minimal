const bsv = require('bsv')
const {
  encoding: { BufferReader },
  crypto: { Hash }
} = bsv

function Header () {
  return this
}

Header.fromBuffer = function fromBuffer (buf, opts) {
  const br = new BufferReader(buf)
  return this.fromBufferReader(br, opts)
}

Header.fromBufferReader = function fromBufferReader (br, opts) {
  const header = new Header()
  const startPos = br.pos
  header.version = br.readReverse(4)
  header.prevHash = br.readReverse(32)
  header.merkleRoot = br.readReverse(32)
  header.time = br.readUInt32LE()
  header.bits = br.readReverse(4)
  header.nonce = br.readUInt32LE()
  header.buffer = br.buf.slice(startPos, br.pos)
  if (opts && opts.hash) {
    header.hash = header.getHash()
  }
  return header
}

Header.prototype.toBuffer = function toBuffer () {
  return this.buffer
}

Header.prototype.getHash = function getHash () {
  if (!this.hash) {
    const buf = this.toBuffer()
    this.hash = Hash.sha256sha256(buf).reverse()
  }
  return this.hash
}

module.exports = Header
