const bsv = require('bsv')
const {
  encoding: { BufferReader },
  crypto: { Hash }
} = bsv

function Transaction () {
  return this
}

Transaction.fromBuffer = function fromBuffer (buf) {
  const br = new BufferReader(buf)
  return this.fromBufferReader(br)
}

Transaction.fromBufferReader = function fromBufferReader (br) {
  const transaction = new Transaction()
  const bufStart = br.pos
  transaction.bufStart = bufStart
  transaction.inputs = []
  transaction.outputs = []
  transaction.version = br.readInt32LE()
  transaction.sizeTxIns = br.readVarintNum()
  for (let i = 0; i < transaction.sizeTxIns; i++) {
    const prevTxId = br.readReverse(32)
    const outputIndex = br.readUInt32LE()
    const scriptBuffer = br.readVarLengthBuffer()
    const sequenceNumber = br.readUInt32LE()

    transaction.inputs.push({
      scriptBuffer,
      prevTxId,
      outputIndex,
      sequenceNumber
    })
  }

  transaction.sizeTxOuts = br.readVarintNum()
  for (
    let outputIndex = 0;
    outputIndex < transaction.sizeTxOuts;
    outputIndex++
  ) {
    const satoshis = br.readUInt64LEBN()
    const size = br.readVarintNum()
    let scriptBuffer
    if (size > 0) {
      scriptBuffer = br.read(size)
    } else {
      scriptBuffer = Buffer.from([])
    }

    transaction.outputs.push({
      scriptBuffer,
      satoshis,
      outputIndex
    })
  }
  transaction.nLockTime = br.readUInt32LE()
  const bufEnd = br.pos
  transaction.bufEnd = bufEnd
  const buffer = br.buf.slice(bufStart, bufEnd)
  if (buffer.length !== bufEnd - bufStart) {
    throw new Error(`Transaction is corrupt`)
  }
  transaction.buffer = buffer
  return transaction
}

Transaction.prototype.toBuffer = function toBuffer () {
  return this.buffer
}

Transaction.prototype.getHash = function getHash () {
  if (!this.hash) {
    const buf = this.toBuffer()
    this.hash = Hash.sha256sha256(buf).reverse()
  }
  return this.hash
}

module.exports = Transaction
