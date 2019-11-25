const Base58 = require('bs58check')
const { BufferReader, Opcode, Hash } = require('./utils')

function Script () {
  return this
}

Script.fromBuffer = function fromBuffer (buf, options = { opreturn: false }) {
  const br = new BufferReader(buf)
  return this.fromBufferReader(br, options)
}

Script.fromBufferReader = function fromBufferReader (
  br,
  options = { opreturn: false }
) {
  const script = new Script()
  script.chunks = []
  script.buffer = br.buf
  if (br.eof()) return opreturn ? false : script
  if (options.opreturn) {
    let opcodenum = br.readUInt8()
    if (opcodenum === Opcode.OP_FALSE) {
      script.chunks.push({ opcodenum })
      if (!br.eof()) {
        opcodenum = br.readUInt8()
      }
    }
    if (opcodenum !== Opcode.OP_RETURN) {
      return false
    }
    script.chunks.push({ opcodenum })
  }
  while (!br.finished()) {
    try {
      const opcodenum = br.readUInt8()

      let len, buf
      if (opcodenum > 0 && opcodenum < Opcode.OP_PUSHDATA1) {
        len = opcodenum
        script.chunks.push({
          buf: br.read(len),
          len: len,
          opcodenum: opcodenum
        })
      } else if (opcodenum === Opcode.OP_PUSHDATA1) {
        len = br.readUInt8()
        buf = br.read(len)
        script.chunks.push({
          buf: buf,
          len: len,
          opcodenum: opcodenum
        })
      } else if (opcodenum === Opcode.OP_PUSHDATA2) {
        len = br.readUInt16LE()
        buf = br.read(len)
        script.chunks.push({
          buf: buf,
          len: len,
          opcodenum: opcodenum
        })
      } else if (opcodenum === Opcode.OP_PUSHDATA4) {
        len = br.readUInt32LE()
        buf = br.read(len)
        script.chunks.push({
          buf: buf,
          len: len,
          opcodenum: opcodenum
        })
      } else {
        script.chunks.push({
          opcodenum: opcodenum
        })
      }
    } catch (err) {
      if (err instanceof RangeError) {
        throw new Error(`Invalid script ${buffer}`)
      }
      throw err
    }
  }
  return script
}

Script.prototype.getOpReturn = function getOpReturn () {
  if (this.opreturn) return this.opreturn
  const chunks = [...this.chunks]
  this.opreturn = []
  let chunk = chunks.shift()
  if (chunk.opcodenum === Opcode.OP_FALSE) {
    chunk = chunks.shift()
  }
  while (chunks.length > 0) {
    const bufs = []
    while (chunks.length > 0) {
      chunk = chunks.shift()
      if (chunk.buf && chunk.buf.length === 1 && chunk.buf.toString() === '|') {
        break
      } else if (chunk.buf) {
        bufs.push(chunk.buf)
      } else {
        bufs.push(Buffer.from(''))
      }
    }
    this.opreturn.push(bufs)
  }
  return this.opreturn
}

Script.prototype.toBuffer = function toBuffer () {
  return this.buffer
}

Script.prototype.toAddress = function toAddress (network) {
  const NETWORK =
    network === 'testnet' ? Buffer.from([0x6f]) : Buffer.from([0x00])

  if (
    this.chunks &&
    this.chunks.length === 5 &&
    this.chunks[0].opcodenum === Opcode.OP_DUP &&
    this.chunks[1].opcodenum === Opcode.OP_HASH160 &&
    this.chunks[2].buf &&
    this.chunks[2].buf.length === 20 &&
    this.chunks[3].opcodenum === Opcode.OP_EQUALVERIFY &&
    this.chunks[4].opcodenum === Opcode.OP_CHECKSIG
  ) {
    const buf = Buffer.concat([NETWORK, this.chunks[2].buf])
    return Base58.encode(buf)
  } else if (
    this.chunks &&
    this.chunks.length === 2 &&
    this.chunks[1].buf &&
    this.chunks[1].buf.length === 33
  ) {
    const buf = Buffer.concat([
      NETWORK,
      Hash.sha256ripemd160(this.chunks[1].buf)
    ])
    return Base58.encode(buf)
  }
  return false
}

module.exports = Script
