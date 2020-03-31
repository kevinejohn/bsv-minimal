const { Base58 } = require('./utils')
const { BufferReader, Opcode, Hash } = require('./utils')

function Script () {
  return this
}

Script.fromBuffer = function fromBuffer (buf, options) {
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
  if (br.eof()) return options.opreturn ? false : script
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
        throw new Error(`Invalid script`)
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

Script.prototype.parseBitcoms = function parseBitcoms () {
  const opreturn = this.getOpReturn()
  const results = []
  for (const cell of opreturn) {
    const bitcom = cell.shift().toString()
    if (bitcom === '19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut') {
      const [data, type, encoding, name] = cell
      results.push({
        bitcom,
        data: {
          data,
          type: type ? type.toString() : '',
          encoding: encoding ? encoding.toString() : '',
          name: name ? name.toString() : ''
        }
      })
    } else if (bitcom === '1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5') {
      const type = cell.shift()
      const map = {}
      while (cell.length > 0) {
        const key = cell.shift().toString()
        const value = cell.shift()
        map[key] = value ? value.toString() : ''
      }
      results.push({
        bitcom,
        data: {
          type: type ? type.toString() : '',
          map
        }
      })
    } else {
      results.push({ bitcom, data: cell })
    }
  }
  return results
}

Script.prototype.getBitcoms = function getBitcoms (
  options = { maxBitcomLen: 50 }
) {
  const bitcoms = new Set()
  const opreturn = this.getOpReturn()
  for (const [bitcom] of opreturn) {
    if (bitcom && bitcom.length > 0 && bitcom.length <= options.maxBitcomLen) {
      bitcoms.add(bitcom.toString())
    }
  }
  return bitcoms
}

Script.prototype.toBuffer = function toBuffer () {
  return this.buffer
}

Script.prototype.toAddressBuf = function toAddressBuf () {
  if (
    // Output
    this.chunks &&
    this.chunks.length === 5 &&
    this.chunks[0].opcodenum === Opcode.OP_DUP &&
    this.chunks[1].opcodenum === Opcode.OP_HASH160 &&
    this.chunks[2].buf &&
    this.chunks[2].buf.length === 20 &&
    this.chunks[3].opcodenum === Opcode.OP_EQUALVERIFY &&
    this.chunks[4].opcodenum === Opcode.OP_CHECKSIG
  ) {
    return this.chunks[2].buf
  } else if (
    // Input
    this.chunks &&
    this.chunks.length === 2 &&
    this.chunks[1].buf &&
    this.chunks[1].buf.length === 33
  ) {
    return Hash.sha256ripemd160(this.chunks[1].buf)
  }
  return false
}

const NETWORK_BUF = {
  testnet: Buffer.from([0x6f]),
  mainnet: Buffer.from([0x00])
}

Script.prototype.toAddress = function toAddress (network = 'mainnet') {
  const addressBuf = this.toAddressBuf()
  if (addressBuf) {
    let buf = Buffer.concat([NETWORK_BUF[network], addressBuf])
    const check = Hash.sha256sha256(buf).slice(0, 4)
    buf = Buffer.concat([buf, check])
    return Base58.encode(buf)
  }
  return false
}

module.exports = Script
