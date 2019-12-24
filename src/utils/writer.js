const BufferWriter = function BufferWriter (obj) {
  if (!(this instanceof BufferWriter)) {
    return new BufferWriter(obj)
  }
  this.bufLen = 0
  if (obj) {
    this.set(obj)
  } else {
    this.bufs = []
  }
}

BufferWriter.prototype.set = function (obj) {
  this.bufs = obj.bufs || this.bufs || []
  this.bufLen = this.bufs.reduce(function (prev, buf) {
    return prev + buf.length
  }, 0)
  return this
}

BufferWriter.prototype.toBuffer = function () {
  return this.concat()
}

BufferWriter.prototype.concat = function () {
  return Buffer.concat(this.bufs, this.bufLen)
}

BufferWriter.prototype.write = function (buf) {
  if (!Buffer.isBuffer(buf)) throw new Error(`Param is not a buffer`)
  this.bufs.push(buf)
  this.bufLen += buf.length
  return this
}

BufferWriter.prototype.writeReverse = function (buf) {
  this.write(Buffer.from(buf).reverse())
  return this
}

BufferWriter.prototype.writeUInt8 = function (n) {
  const buf = Buffer.alloc(1)
  buf.writeUInt8(n)
  this.write(buf)
  return this
}

BufferWriter.prototype.writeUInt16BE = function (n) {
  const buf = Buffer.alloc(2)
  buf.writeUInt16BE(n)
  this.write(buf)
  return this
}

BufferWriter.prototype.writeUInt16LE = function (n) {
  const buf = Buffer.alloc(2)
  buf.writeUInt16LE(n)
  this.write(buf)
  return this
}

BufferWriter.prototype.writeUInt32BE = function (n) {
  const buf = Buffer.alloc(4)
  buf.writeUInt32BE(n)
  this.write(buf)
  return this
}

BufferWriter.prototype.writeInt32LE = function (n) {
  const buf = Buffer.alloc(4)
  buf.writeInt32LE(n)
  this.write(buf)
  return this
}

BufferWriter.prototype.writeUInt32LE = function (n) {
  const buf = Buffer.alloc(4)
  buf.writeUInt32LE(n)
  this.write(buf)
  return this
}

BufferWriter.prototype.writeUInt64BE = function (bn) {
  const buf = Buffer.alloc(8)
  buf.writeBigInt64BE(BigInt(bn))
  this.write(buf)
  return this
}

BufferWriter.prototype.writeUInt64LE = function (bn) {
  const buf = Buffer.alloc(8)
  buf.writeBigInt64LE(BigInt(bn))
  this.write(buf)
  return this
}

BufferWriter.prototype.writeVarintNum = function (n) {
  const buf = BufferWriter.varintBufNum(n)
  this.write(buf)
  return this
}

BufferWriter.varintBufNum = function (n) {
  let buf
  if (n < 253) {
    buf = Buffer.alloc(1)
    buf.writeUInt8(n, 0)
  } else if (n < 0x10000) {
    buf = Buffer.alloc(1 + 2)
    buf.writeUInt8(253, 0)
    buf.writeUInt16LE(n, 1)
  } else if (n < 0x100000000) {
    buf = Buffer.alloc(1 + 4)
    buf.writeUInt8(254, 0)
    buf.writeUInt32LE(n, 1)
  } else {
    buf = Buffer.alloc(1 + 8)
    buf.writeUInt8(255, 0)
    buf.writeInt32LE(n & -1, 1)
    buf.writeUInt32LE(Math.floor(n / 0x100000000), 5)
  }
  return buf
}

module.exports = BufferWriter
