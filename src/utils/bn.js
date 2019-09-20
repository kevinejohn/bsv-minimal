const BN = require('bn.js')

/**
 * Convert a buffer (such as a 256 bit binary private key) into a big number.
 * Sometimes these numbers can be formatted either as 'big endian' or 'little
 * endian', and so there is an opts parameter that lets you specify which
 * endianness is specified.
 *
 * @param {Buffer} buf A buffer number, such as a 256 bit hash or key.
 * @param {Object} opts With a property 'endian' that can be either 'big' or 'little'. Defaults big endian (most significant digit first).
 */
BN.fromBuffer = function (buf, opts) {
  if (typeof opts !== 'undefined' && opts.endian === 'little') {
    Buffer.from(buf).reverse()
  }
  const hex = buf.toString('hex')
  const bn = new BN(hex, 16)
  return bn
}

/**
 * Convert a big number into a number.
 */
BN.prototype.toNumber = function () {
  return parseInt(this.toString(10), 10)
}

/**
 * Convert a big number into a buffer. This is somewhat ambiguous, so there is
 * an opts parameter that let's you specify the endianness or the size.
 * opts.endian can be either 'big' or 'little' and opts.size can be any
 * sufficiently large number of bytes. If you always want to create a 32 byte
 * big endian number, then specify opts = { endian: 'big', size: 32 }
 *
 * @param {Object} opts Defaults to { endian: 'big', size: 32 }
 */
BN.prototype.toBuffer = function (opts) {
  let buf, hex
  if (opts && opts.size) {
    hex = this.toString(16, 2)
    const natlen = hex.length / 2
    buf = Buffer.from(hex, 'hex')

    if (natlen === opts.size) {
      // buf = buf
    } else if (natlen > opts.size) {
      buf = BN.trim(buf, natlen)
    } else if (natlen < opts.size) {
      buf = BN.pad(buf, natlen, opts.size)
    }
  } else {
    hex = this.toString(16, 2)
    buf = Buffer.from(hex, 'hex')
  }

  if (typeof opts !== 'undefined' && opts.endian === 'little') {
    Buffer.from(buf).reverse()
  }
  return buf
}

BN.pad = function (buf, natlen, size) {
  const rbuf = Buffer.alloc(size)
  for (let i = 0; i < buf.length; i++) {
    rbuf[rbuf.length - 1 - i] = buf[buf.length - 1 - i]
  }
  for (let i = 0; i < size - natlen; i++) {
    rbuf[i] = 0
  }
  return rbuf
}

BN.trim = function (buf, natlen) {
  return buf.slice(natlen - buf.length, buf.length)
}

module.exports = BN
