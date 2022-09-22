import crypto from "crypto";

function sha256(buf: Buffer) {
  return crypto.createHash("sha256").update(buf).digest();
}

function sha256sha256(buf: Buffer) {
  return sha256(sha256(buf));
}

function ripemd160(buf: Buffer) {
  return crypto.createHash("ripemd160").update(buf).digest();
}

function sha256ripemd160(buf: Buffer) {
  return ripemd160(sha256(buf));
}

export default {
  sha256,
  sha256sha256,
  ripemd160,
  sha256ripemd160,
};
