const bsv = require('bsv')
const {
  encoding: { BufferReader },
  crypto: { Hash }
} = bsv

const HEADER_SIZE = 80

function Header () {
  return this
}

Header.fromBuffer = function (buf) {
  const br = new BufferReader(buf)
  return this.fromBufferReader(br)
}

Header.fromBufferReader = function fromBufferReader (br) {
  const header = new Header()
  header.hash = Hash.sha256sha256(
    br.buf.slice(br.pos, br.pos + HEADER_SIZE)
  ).reverse()
  header.version = br.readReverse(4)
  header.prevHash = br.readReverse(32)
  header.merkleRoot = br.readReverse(32)
  header.time = br.readUInt32LE()
  header.bits = br.readReverse(4)
  header.nonce = br.readUInt32LE()
  return header
}
module.exports = Header
