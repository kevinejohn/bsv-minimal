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

Transaction.prototype.getOpReturns = function getOpReturns (
  options = { singleOpReturn: false }
) {
  if (this.opreturns) return this.opreturns
  this.opreturns = []
  let index = 0
  for (const output of this.outputs) {
    if (output.script === undefined) {
      output.script = Script.fromBuffer(output.scriptBuffer, { opreturn: true })
    }
    if (output.script) {
      this.opreturns.push([index, output.script.getOpReturn()])
      if (options.singleOpReturn) break
    }
    index++
  }
  return this.opreturns
}

const MAX_BITCOM_LENGTH = 50

Transaction.prototype.getBitcoms = function getBitcoms (options) {
  if (this.bitcoms) return this.bitcoms
  this.bitcoms = new Set()
  const opreturns = this.getOpReturns(options)
  for (const [index, opreturn] of opreturns) {
    for (const [bitcom] of opreturn) {
      if (bitcom && bitcom.length > 0 && bitcom.length <= MAX_BITCOM_LENGTH) {
        this.bitcoms.add(bitcom.toString())
      }
    }
  }
  return this.bitcoms
}

Transaction.prototype.parseBitcoms = function parseBitcoms (options) {
  const results = []
  const opreturns = this.getOpReturns(options)
  for (const [index, opreturn] of opreturns) {
    for (const cell of opreturn) {
      const bitcom = cell.shift().toString()
      if (bitcom === '19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut') {
        const [data, type, encoding, name] = cell
        results.push({
          bitcom,
          data: {
            data,
            type: type ? type.toString() : '',
            encoding: encoding ? encoding.toString() : '',
            name: name ? name.toString() : ''
          }
        })
      } else if (bitcom === '1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5') {
        const type = cell.shift()
        const map = {}
        while (cell.length > 0) {
          const key = cell.shift().toString()
          const value = cell.shift()
          map[key] = value ? value.toString() : ''
        }
        results.push({
          bitcom,
          data: {
            type: type ? type.toString() : '',
            map
          }
        })
      } else {
        results.push({ bitcom, data: cell })
      }
    }
  }
  return results
}

module.exports = Transaction
