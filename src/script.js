const { BufferReader, Opcode } = require('./utils')

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

Script.prototype.toAddress = function toAddress () {
  return this.chunks[2]
}

module.exports = Script
