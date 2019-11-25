const Transaction = require('./transaction')
const Header = require('./header')
const BlockLite = require('./blocklite')
const { BufferReader, BufferWriter, Hash } = require('./utils')

function Block (options) {
  this.txRead = 0
  this.size = 0
  this.options = options
  this.merkleArray = [[]]
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

Block.prototype.validate = async function validate () {
  if (this.computedMerkleRoot) {
    if (Buffer.compare(this.computedMerkleRoot, this.header.merkleRoot) !== 0) {
      throw new Error(`Invalid merkle root!`)
    }
    // console.log(`Merkle root is valid`)
  } else if (this.transactions) {
    for (const transaction of this.transactions) {
      this.addMerkleHash(transaction.getHash())
    }
  } else {
    throw new Error(`Must call addMerkleHash on all transactions first`)
  }
}

Block.prototype.addMerkleHash = function addMerkleHash (index, hash) {
  const { merkleArray, computedMerkleRoot, txCount } = this
  if (computedMerkleRoot) return
  merkleArray[0].push(Buffer.from(hash).reverse())
  const finished = index + 1 >= txCount

  const calculate = (height = 0) => {
    if (
      finished &&
      merkleArray[height].length === 1 &&
      merkleArray.slice(height).length === 1
    ) {
      this.computedMerkleRoot = merkleArray[height][0].reverse()
      this.merkleArray = [[]]
      this.validate()
      return
    }

    if (finished || merkleArray[height].length === 2) {
      const first = merkleArray[height].shift()
      const second = merkleArray[height].shift() || first
      const concat = Buffer.concat([first, second])
      const hash = Hash.sha256sha256(concat)
      if (!merkleArray[height + 1]) merkleArray.push([])
      merkleArray[height + 1].push(hash)
      calculate(height + 1)
    }
  }
  calculate()
}

Block.prototype.getTransactionsAsync = async function getTransactionsAsync (
  callback
) {
  const { txPos, txCount, transactions, header, options } = this
  if (transactions) {
    await callback({
      transactions: transactions.map((tx, index) => {
        if (options && options.validate) {
          this.addMerkleHash(index, tx.getHash())
        }
        return [index, tx]
      }),
      finished: true,
      started: true,
      header
    })
  } else if (txPos) {
    const buf = this.toBuffer()
    const br = new BufferReader(buf)
    br.read(txPos)
    if (txCount === 0) {
      await callback({
        transactions: [],
        finished: true,
        started: true,
        header
      })
    } else {
      for (let index = 0; index < txCount; index++) {
        const transaction = Transaction.fromBufferReader(br)
        this.txRead = index + 1
        if (options && options.validate) {
          this.addMerkleHash(index, transaction.getHash())
        }
        await callback({
          transactions: [[index, transaction]],
          finished: this.finished(),
          started: index === 0,
          header
        })
      }
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
  const { options } = this
  const started = this.size === 0 && !this.chunk
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
      for (let index = this.txRead; index < this.txCount; index++) {
        const bufStart = this.size + br.pos
        const transaction = Transaction.fromBufferReader(br)
        transaction.bufStart = bufStart // Make relative to block
        transaction.bufEnd = this.size + br.pos
        transactions.push([index, transaction])
        this.txRead = index + 1
        postPos = br.pos

        if (options && options.validate) {
          this.addMerkleHash(index, transaction.getHash())
        }
      }
    } catch (err) {
      // console.log(err)
    }
    if (postPos > 0) {
      this.size += postPos
      this.chunk = this.chunk.slice(postPos)
    }
  }

  const finished = this.finished()

  return {
    size: this.size,
    header: this.header,
    transactions,
    started,
    finished,
    remaining: this.chunk,
    bytesRead: this.size - startSize
  }
}

module.exports = Block
