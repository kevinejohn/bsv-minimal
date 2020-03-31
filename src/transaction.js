const Script = require('./script')
const { BufferReader, Hash } = require('./utils')

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
  for (let vin = 0; vin < transaction.sizeTxIns; vin++) {
    const prevTxId = br.readReverse(32)
    const vout = br.readUInt32LE()
    const scriptBuffer = br.readVarLengthBuffer()
    const sequenceNumber = br.readUInt32LE()

    transaction.inputs.push({
      vin,
      scriptBuffer,
      prevTxId,
      vout,
      sequenceNumber
    })
  }

  transaction.sizeTxOuts = br.readVarintNum()
  for (let vout = 0; vout < transaction.sizeTxOuts; vout++) {
    const satoshis = br.readUInt64LE()
    const scriptBuffer = br.readVarLengthBuffer()

    transaction.outputs.push({
      scriptBuffer,
      satoshis,
      vout
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

Transaction.prototype.getScripts = function getScripts (options) {
  const scripts = []
  for (const output of this.outputs) {
    const script = Script.fromBuffer(output.scriptBuffer, options)
    scripts.push(script)
  }
  return scripts
}

Transaction.prototype.getOpReturns = function getOpReturns (
  options = { singleOpReturn: false }
) {
  const opreturns = []
  let index = 0
  const scripts = this.getScripts({ opreturn: true })
  for (const script of scripts) {
    if (script) {
      opreturns.push([index, script.getOpReturn()])
      if (options.singleOpReturn) break
    }
    index++
  }
  return opreturns
}

Transaction.prototype.parseBitcoms = function parseBitcoms (
  options = { singleOpReturn: false }
) {
  const bitcoms = []
  const scripts = this.getScripts({ opreturn: true })
  for (const script of scripts) {
    if (script) {
      for (const bitcom of script.parseBitcoms()) {
        bitcoms.push(bitcom)
      }
      if (options.singleOpReturn) break
    }
  }
  return bitcoms
}

Transaction.prototype.getBitcoms = function getBitcoms (options) {
  const bitcoms = new Set()
  const scripts = this.getScripts({ opreturn: true })
  for (const script of scripts) {
    if (script) {
      script.getBitcoms(options).forEach(bitcom => bitcoms.add(bitcom))
    }
  }
  return bitcoms
}

module.exports = Transaction
