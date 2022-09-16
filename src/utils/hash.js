const crypto = require("crypto");

function sha256(buf) {
  if (!Buffer.isBuffer(buf)) throw new Error(`Not a buffer`);
  return crypto.createHash("sha256").update(buf).digest();
}

function sha256sha256(buf) {
  return sha256(sha256(buf));
}

function ripemd160(buf) {
  if (!Buffer.isBuffer(buf)) throw new Error(`Not a buffer`);
  return crypto.createHash("ripemd160").update(buf).digest();
}

function sha256ripemd160(buf) {
  return ripemd160(sha256(buf));
}

module.exports = {
  sha256,
  sha256sha256,
  ripemd160,
  sha256ripemd160,
};
