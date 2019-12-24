const BufferReader = function BufferReader (buf) {
  if (!(this instanceof BufferReader)) {
    return new BufferReader(buf)
  }
  if (!buf) return
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

BufferReader.prototype.set = function (obj) {
  this.buf = obj.buf || this.buf || undefined
  this.pos = obj.pos || this.pos || 0
  return this
}

BufferReader.prototype.eof = function () {
  return this.pos >= this.buf.length
}

BufferReader.prototype.finished = BufferReader.prototype.eof

BufferReader.prototype.read = function (len) {
  if (typeof len === 'undefined') throw new Error(`Must specify a length`)
  const buf = Buffer.from(this.buf.slice(this.pos, this.pos + len))
  this.pos = this.pos + len
  return buf
}

BufferReader.prototype.readAll = function () {
  const buf = Buffer.from(this.buf.slice(this.pos, this.buf.length))
  this.pos = this.buf.length
  return buf
}

BufferReader.prototype.readUInt8 = function () {
  const val = this.buf.readUInt8(this.pos)
  this.pos = this.pos + 1
  return val
}

BufferReader.prototype.readUInt16BE = function () {
  const val = this.buf.readUInt16BE(this.pos)
  this.pos = this.pos + 2
  return val
}

BufferReader.prototype.readUInt16LE = function () {
  const val = this.buf.readUInt16LE(this.pos)
  this.pos = this.pos + 2
  return val
}

BufferReader.prototype.readUInt32BE = function () {
  const val = this.buf.readUInt32BE(this.pos)
  this.pos = this.pos + 4
  return val
}

BufferReader.prototype.readUInt32LE = function () {
  const val = this.buf.readUInt32LE(this.pos)
  this.pos = this.pos + 4
  return val
}

BufferReader.prototype.readInt32LE = function () {
  const val = this.buf.readInt32LE(this.pos)
  this.pos = this.pos + 4
  return val
}

function bigIntToNum (num) {
  num = Number(num)
  if (!(num <= Math.pow(2, 53))) {
    throw new Error('number too large to retain precision')
  }
  return num
}

BufferReader.prototype.readUInt64BE = function () {
  const bn = this.readUInt64BEBI()
  return bigIntToNum(bn)
}

BufferReader.prototype.readUInt64LE = function () {
  const bn = this.readUInt64LEBI()
  return bigIntToNum(bn)
}

BufferReader.prototype.readUInt64BEBI = function () {
  const bn = this.buf.readBigUInt64BE(this.pos)
  this.pos = this.pos + 8
  return bn
}

BufferReader.prototype.readUInt64LEBI = function () {
  const bn = this.buf.readBigUInt64LE(this.pos)
  this.pos = this.pos + 8
  return bn
}

BufferReader.prototype.readVarintNum = function () {
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

/**
 * reads a length prepended buffer
 */
BufferReader.prototype.readVarLengthBuffer = function () {
  const len = this.readVarintNum()
  const buf = this.read(len)
  if (buf.length !== len) {
    throw new Error(
      `Invalid length while reading varlength buffer. Expected to read: ${len} and read ${
        buf.length
      }`
    )
  }
  return buf
}

BufferReader.prototype.readVarintBuf = function () {
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

BufferReader.prototype.reverse = function () {
  this.buf.reverse()
  return this
}

BufferReader.prototype.readReverse = function (len) {
  const buf = this.read(len)
  return buf.reverse()
}

module.exports = BufferReader
