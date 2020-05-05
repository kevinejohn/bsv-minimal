class BufferWriter {
  constructor (obj) {
    this.bufLen = 0
    if (obj) {
      this.set(obj)
    } else {
      this.bufs = []
    }
  }

  set (obj) {
    this.bufs = obj.bufs || this.bufs || []
    this.bufLen = this.bufs.reduce(function (prev, buf) {
      return prev + buf.length
    }, 0)
    return this
  }

  toBuffer () {
    return this.concat()
  }

  concat () {
    return Buffer.concat(this.bufs, this.bufLen)
  }

  write (buf) {
    if (!Buffer.isBuffer(buf)) throw new Error(`Param is not a buffer`)
    this.bufs.push(buf)
    this.bufLen += buf.length
    return this
  }

  writeReverse (buf) {
    this.write(Buffer.from(buf).reverse())
    return this
  }

  writeUInt8 (n) {
    const buf = Buffer.alloc(1)
    buf.writeUInt8(n)
    this.write(buf)
    return this
  }

  writeUInt16BE (n) {
    const buf = Buffer.alloc(2)
    buf.writeUInt16BE(n)
    this.write(buf)
    return this
  }

  writeUInt16LE (n) {
    const buf = Buffer.alloc(2)
    buf.writeUInt16LE(n)
    this.write(buf)
    return this
  }

  writeUInt32BE (n) {
    const buf = Buffer.alloc(4)
    buf.writeUInt32BE(n)
    this.write(buf)
    return this
  }

  writeInt32LE (n) {
    const buf = Buffer.alloc(4)
    buf.writeInt32LE(n)
    this.write(buf)
    return this
  }

  writeUInt32LE (n) {
    const buf = Buffer.alloc(4)
    buf.writeUInt32LE(n)
    this.write(buf)
    return this
  }

  writeUInt64BE (bn) {
    const buf = Buffer.alloc(8)
    buf.writeBigInt64BE(BigInt(bn))
    this.write(buf)
    return this
  }

  writeUInt64LE (bn) {
    const buf = Buffer.alloc(8)
    buf.writeBigInt64LE(BigInt(bn))
    this.write(buf)
    return this
  }

  writeVarintNum (n) {
    const buf = BufferWriter.varintBufNum(n)
    this.write(buf)
    return this
  }

  writeVarLengthBuffer (buf) {
    const len = BufferWriter.varintBufNum(buf.length)
    this.write(len)
    this.write(buf)
    return this
  }

  static varintBufNum (n) {
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
}

module.exports = BufferWriter
