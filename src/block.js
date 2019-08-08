const bsv = require('bsv')
const Transaction = require('./transaction')
const Header = require('./header')
const BlockLite = require('./blocklite')
const {
  encoding: { BufferReader, BufferWriter }
} = bsv

function Block () {
  this.txRead = 0
  this.size = 0
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
    this.txRead = i + 1
  }
  return this.transactions
}

Block.prototype.getTransactionsAsync = async function getTransactionsAsync (
  callback
) {
  if (this.transactions) {
    for (const [index, transaction] of this.transactions.entries()) {
      this.txRead = index + 1
      await callback({
        transactions: [
          {
            transaction,
            index
          }
        ],
        finished: this.finished(),
        header: this.header
      })
    }
  } else if (this.txPos) {
    const { txPos, txCount } = this
    const buf = this.toBuffer()
    const br = new BufferReader(buf)
    br.read(txPos)
    for (let index = 0; index < txCount; index++) {
      const transaction = Transaction.fromBufferReader(br)
      this.txRead = index + 1
      await callback({
        transactions: [
          {
            transaction,
            index
          }
        ],
        finished: this.finished(),
        header: this.header
      })
    }
  } else {
    throw new Error(`Did not read block`)
  }
}

Block.prototype.toBuffer = function toBuffer () {
  return this.buffer
}

Block.prototype.toBlockLite = function toBlockLite () {
  return BlockLite.fromBlockBuffer(this.toBuffer())
}

Block.prototype.finished = function finished () {
  if (this.txRead > this.txCount) {
    throw new Error(`Transaction is corrupted`)
  }
  return this.txCount !== undefined && this.txRead === this.txCount
}

Block.prototype.addBufferChunk = function addBufferChunk (buf) {
  // TODO: Detect and stop on corrupt data
  this.chunk = this.chunk ? Buffer.concat([this.chunk, buf]) : buf
  const startSize = this.size

  if (!this.header && this.chunk.length >= Header.size) {
    const br = new BufferReader(this.chunk)
    this.header = Header.fromBufferReader(br)
    this.size += br.pos
    this.chunk = this.chunk.slice(br.pos)
  }
  if (this.header && this.txCount === undefined && this.chunk.length > 0) {
    try {
      const br = new BufferReader(this.chunk)
      this.txCount = br.readVarintNum()
      this.size += br.pos
      this.chunk = this.chunk.slice(br.pos)
    } catch (err) {
      // console.log(err)
    }
  }
  const transactions = []
  if (this.header && this.txCount !== undefined && this.chunk.length > 0) {
    const br = new BufferReader(this.chunk)
    let postPos = br.pos
    try {
      for (let i = this.txRead; i < this.txCount; i++) {
        const transaction = Transaction.fromBufferReader(br)
        transactions.push({
          index: i,
          transaction
        })
        this.txRead = i + 1
        postPos = br.pos
      }
    } catch (err) {
      // console.log(err)
    }
    if (postPos > 0) {
      this.size += postPos
      this.chunk = this.chunk.slice(postPos)
    }
  }

  return {
    size: this.size,
    header: this.header,
    transactions,
    finished: this.finished(),
    remaining: this.chunk,
    bytesRead: this.size - startSize
  }
}

module.exports = Block
