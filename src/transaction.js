const bsv = require('bsv')
const {
  encoding: { BufferReader },
  crypto: { Hash }
} = bsv

function Transaction () {
  return this
}

Transaction.fromBuffer = async function (buf) {
  const br = new BufferReader(buf)
  return this.fromBufferReader(br)
}

Transaction.fromBufferReader = function fromBufferReader (br) {
  const transaction = new Transaction()
  const startPos = br.pos
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
  transaction.hash = Hash.sha256sha256(
    br.buf.slice(br.pos - (br.pos - startPos), br.pos)
  ).reverse()
  return transaction
}

module.exports = Transaction
