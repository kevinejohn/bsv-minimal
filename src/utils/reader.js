function bigIntToNum (num) {
  num = Number(num)
  if (!(num <= Math.pow(2, 53))) {
    throw new Error('number too large to retain precision')
  }
  return num
}

class BufferReader {
  constructor (buf) {
    if (Buffer.isBuffer(buf)) {
      this.set({ buf })
    } else if (typeof buf === 'string') {
      const len = buf.length
      buf = Buffer.from(buf, 'hex')
      if (buf.length * 2 !== len) {
        throw new TypeError('Invalid hex string')
      }
      this.set({ buf })
    } else if (typeof buf === 'object') {
      const obj = buf
      this.set(obj)
    } else {
      throw new TypeError(`Unrecognized argument for BufferReader`)
    }
  }

  slice (i, j) {
    return this.buf.slice(i, j)
  }

  set (obj) {
    this.buf = obj.buf || this.buf || undefined
    this.pos = obj.pos || this.pos || 0
    return this
  }

  eof () {
    return this.pos >= this.buf.length
  }

  finished () {
    return this.eof()
  }

  read (len) {
    if (typeof len === 'undefined') throw new Error(`Must specify a length`)
    const buf = Buffer.from(this.buf.slice(this.pos, this.pos + len))
    this.pos = this.pos + len
    return buf
  }

  readAll () {
    const buf = Buffer.from(this.buf.slice(this.pos, this.buf.length))
    this.pos = this.buf.length
    return buf
  }

  readUInt8 () {
    const val = this.buf.readUInt8(this.pos)
    this.pos = this.pos + 1
    return val
  }

  readUInt16BE () {
    const val = this.buf.readUInt16BE(this.pos)
    this.pos = this.pos + 2
    return val
  }

  readUInt16LE () {
    const val = this.buf.readUInt16LE(this.pos)
    this.pos = this.pos + 2
    return val
  }

  readUInt32BE () {
    const val = this.buf.readUInt32BE(this.pos)
    this.pos = this.pos + 4
    return val
  }

  readUInt32LE () {
    const val = this.buf.readUInt32LE(this.pos)
    this.pos = this.pos + 4
    return val
  }

  readInt32LE () {
    const val = this.buf.readInt32LE(this.pos)
    this.pos = this.pos + 4
    return val
  }

  readUInt64BE () {
    const bn = this.readUInt64BEBI()
    return bigIntToNum(bn)
  }

  readUInt64LE () {
    const bn = this.readUInt64LEBI()
    return bigIntToNum(bn)
  }

  readUInt64BEBI () {
    const bn = this.buf.readBigUInt64BE(this.pos)
    this.pos = this.pos + 8
    return bn
  }

  readUInt64LEBI () {
    const bn = this.buf.readBigUInt64LE(this.pos)
    this.pos = this.pos + 8
    return bn
  }

  readVarintNum () {
    const first = this.readUInt8()
    switch (first) {
      case 0xfd:
        return this.readUInt16LE()
      case 0xfe:
        return this.readUInt32LE()
      case 0xff:
        return this.readUInt64LE()
      default:
        return first
    }
  }

  readVarLengthBuffer () {
    const len = this.readVarintNum()
    const buf = this.read(len)
    if (buf.length !== len) {
      throw new Error(
        `Invalid length while reading varlength buffer. Expected to read: ${len} and read ${buf.length}`
      )
    }
    return buf
  }

  readVarintBuf () {
    const first = this.buf.readUInt8(this.pos)
    switch (first) {
      case 0xfd:
        return this.read(1 + 2)
      case 0xfe:
        return this.read(1 + 4)
      case 0xff:
        return this.read(1 + 8)
      default:
        return this.read(1)
    }
  }

  reverse () {
    this.buf.reverse()
    return this
  }

  readReverse (len) {
    const buf = this.read(len)
    return buf.reverse()
  }
}

module.exports = BufferReader
