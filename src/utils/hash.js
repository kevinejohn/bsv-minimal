const crypto = require('crypto')

function sha256 (buf) {
  if (!Buffer.isBuffer(buf)) throw new Error(`Not a buffer`)
  return crypto
    .createHash('sha256')
    .update(buf)
    .digest()
}

function sha256sha256 (buf) {
  return sha256(sha256(buf))
}

module.exports = {
  sha256,
  sha256sha256
}
