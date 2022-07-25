function bigIntToNum (num) {
  num = Number(num)
  if (!(num <= Math.pow(2, 53))) {
    throw new Error('number too large to retain precision')
  }
  return num
}

class BufferChunksReader {
  constructor (bufs) {
    if (bufs) {
      this.bufs = Array.isArray(bufs) ? bufs : [bufs]
    } else {
      this.bufs = []
    }
    this.pos = 0
    this.bufIndex = 0
    this.bufPos = 0
    this.length = this.bufs.reduce((prev, buf) => prev + buf.length, 0)
  }

  append (buf) {
    this.bufs.push(buf)
    this.length += buf.length
  }

  eof () {
    return this.pos >= this.length
  }

  finished () {
    return this.eof()
  }

  read (len, noBuf = false) {
    if (len === 0) return !noBuf ? Buffer.from('') : undefined
    if (!(len > 0)) throw Error(`Invalid read length: ${len}`)
    if (len + this.pos > this.length) throw Error('Out of bounds')
    let { bufIndex, bufPos } = this
    let left = len
    const bufs = []
    while (left > 0) {
      const buf = this.bufs[bufIndex]
      if (left > buf.length - bufPos) {
        !noBuf && bufs.push(buf.slice(bufPos))
        left -= buf.length - bufPos
        bufIndex++
        bufPos = 0
      } else {
        !noBuf && bufs.push(buf.slice(bufPos, bufPos + left))
        bufPos += left
        left = 0
      }
      if (!this.bufs[bufIndex]) throw Error('Out of bounds')
    }
    this.bufIndex = bufIndex
    this.bufPos = bufPos
    this.pos += len
    if (!noBuf) return Buffer.concat(bufs)
  }

  rewind (len) {
    if (len === 0) return
    if (!(len > 0)) throw Error(`Invalid rewind length: ${len}`)
    let { bufIndex, bufPos } = this
    let left = len
    while (left > 0) {
      if (left > bufPos) {
        left -= bufPos
        bufIndex--
        const buf = this.bufs[bufIndex]
        if (!buf) throw Error('Out of bounds')
        bufPos = buf.length
      } else {
        bufPos -= left
        left = 0
      }
    }
    this.bufIndex = bufIndex
    this.bufPos = bufPos
    this.pos -= len
  }

  slice (i, j) {
    const { bufPos, bufIndex, pos } = this
    if (i > pos) {
      this.read(i - pos, true)
    } else if (i < pos) {
      this.rewind(pos - i)
    }
    const buf = this.read(j - i)
    this.pos = pos
    this.bufPos = bufPos
    this.bufIndex = bufIndex
    return buf
  }

  readAll () {
    const buf = this.read(this.length - this.pos)
    return buf
  }

  readUInt8 () {
    const buf = this.read(1)
    return buf.readUInt8()
  }

  readUInt16BE () {
    const buf = this.read(2)
    return buf.readUInt16BE()
  }

  readUInt16LE () {
    const buf = this.read(2)
    return buf.readUInt16LE()
  }

  readUInt32BE () {
    const buf = this.read(4)
    return buf.readUInt32BE()
  }

  readUInt32LE () {
    const buf = this.read(4)
    return buf.readUInt32LE()
  }

  readInt32LE () {
    const buf = this.read(4)
    return buf.readInt32LE()
  }

  readUInt64BE () {
    const bn = this.readUInt64BEBI()
    return bigIntToNum(bn)
  }

  readUInt64LE () {
    const bn = this.readUInt64LEBI()
    return bigIntToNum(bn)
  }

  readBigUInt64BE () {
    const buf = this.read(8)
    return buf.readBigUInt64BE()
  }

  readBigUInt64LE () {
    const buf = this.read(8)
    return buf.readBigUInt64LE()
  }

  readUInt64BEBI () {
    const buf = this.readBigUInt64BE()
    return buf
  }

  readUInt64LEBI () {
    const buf = this.readBigUInt64LE()
    return buf
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

  readReverse (len) {
    const buf = this.read(len)
    return buf.reverse()
  }

  trim () {
    // Frees memory of buffer chunks already read
    if (this.bufIndex === 0) return
    this.bufs = this.bufs.slice(this.bufIndex)
    this.bufIndex = 0
  }
}

module.exports = BufferChunksReader
