const bsv = require('bsv')
const Transaction = require('./transaction')
const Header = require('./header')
const BlockLite = require('./blocklite')
const {
  encoding: { BufferReader, BufferWriter }
} = bsv

function Block () {
  return this
}

/**
 * Instantiate a Block from a Buffer
 *
 * @param {Buffer}
 * @returns {Block}
 * @constructor
 */
Block.fromBuffer = function fromBuffer (buf) {
  const br = new BufferReader(buf)
  const block = new Block()
  block.header = Header.fromBufferReader(br)
  block.txCount = br.readVarintNum()
  block.txPos = br.pos
  block.size = buf.length
  block.buffer = buf
  return block
}

Block.fromBlockLite = function fromBlockLite (blockLite, transactions) {
  const bw = new BufferWriter()
  bw.write(blockLite.header.toBuffer())
  bw.writeVarintNum(blockLite.txCount)
  for (let i = 0; i < blockLite.txCount; i++) {
    if (
      !transactions[i] ||
      Buffer.compare(blockLite.txids[i], transactions[i].getHash()) !== 0
    ) {
      throw new Error(`Invalid transactions`)
    }
    bw.write(transactions[i].toBuffer())
  }
  const buf = bw.toBuffer()
  const block = Block.fromBuffer(buf)
  return block
}

Block.prototype.getHash = function getHash () {
  if (!this.hash) {
    this.hash = this.header.getHash()
  }
  return this.hash
}

Block.prototype.getTransactions = function getTransactions () {
  if (this.transactions) return this.transactions
  this.transactions = []
  const { txPos, txCount } = this
  const buf = this.toBuffer()
  const br = new BufferReader(buf)
  br.read(txPos)
  for (let i = 0; i < txCount; i++) {
    const transaction = Transaction.fromBufferReader(br)
    this.transactions.push(transaction)
  }
  return this.transactions
}

Block.prototype.getTransactionsAsync = async function getTransactionsAsync (
  callback
) {
  if (this.transactions) {
    for (const transaction of this.transactions) {
      await callback(transaction)
    }
    return
  }
  const { txPos, txCount } = this
  const buf = this.toBuffer()
  const br = new BufferReader(buf)
  br.read(txPos)
  for (let i = 0; i < txCount; i++) {
    const transaction = Transaction.fromBufferReader(br)
    await callback(transaction)
  }
}

Block.prototype.toBuffer = function toBuffer () {
  return this.buffer
}

Block.prototype.toBlockLite = function toBlockLite () {
  return BlockLite.fromBlockBuffer(this.toBuffer())
}

module.exports = Block
