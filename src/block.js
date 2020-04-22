const Transaction = require('./transaction')
const Header = require('./header')
const BlockLite = require('./blocklite')
const { BufferReader, BufferWriter, Hash } = require('./utils')

class Block {
  constructor (options = {}) {
    this.txRead = 0
    this.size = 0
    this.options = options
    this.merkleArray = [[]]
  }

  static fromBuffer (buf) {
    const br = new BufferReader(buf)
    const block = new Block()
    block.header = Header.fromBufferReader(br)
    block.txCount = br.readVarintNum()
    block.txPos = br.pos
    block.size = buf.length
    block.buffer = buf
    return block
  }

  static fromBlockLite (blockLite, transactions) {
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

  getHash () {
    if (!this.hash) {
      this.hash = this.header.getHash()
    }
    return this.hash
  }

  getTransactions () {
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

  validate () {
    if (this.computedMerkleRoot) {
      if (
        Buffer.compare(this.computedMerkleRoot, this.header.merkleRoot) !== 0
      ) {
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

  addMerkleHash (index, hash) {
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

  async getTransactionsAsync (callback) {
    const { txPos, txCount, transactions, header, options } = this
    if (transactions) {
      await callback({
        transactions: transactions.map((tx, index) => {
          if (options.validate) {
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
          if (options.validate) {
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

  toBuffer () {
    return this.buffer
  }

  toBlockLite () {
    return BlockLite.fromBlockBuffer(this.toBuffer())
  }

  finished () {
    if (this.txRead > this.txCount) {
      throw new Error(`Block is corrupted`)
    }
    return this.txCount !== undefined && this.txRead === this.txCount
  }

  addBufferChunk (buf) {
    // TODO: Detect and stop on corrupt data
    const started = this.size === 0
    this.chunk = this.chunk ? Buffer.concat([this.chunk, buf]) : buf
    const startSize = this.size

    const br = new BufferReader(this.chunk)
    if (!this.header) {
      let prePos = br.pos
      try {
        this.header = Header.fromBufferReader(br)
      } catch (err) {
        // console.log(err)
        delete this.header
        br.pos = prePos
      }
    }
    if (this.header && this.txCount === undefined) {
      try {
        this.txCount = br.readVarintNum()
      } catch (err) {
        // console.log(err)
      }
    }
    const transactions = []
    if (this.header && this.txCount !== undefined) {
      let prePos
      try {
        for (let index = this.txRead; index < this.txCount; index++) {
          prePos = br.pos
          const bufStart = this.size + br.pos
          const transaction = Transaction.fromBufferReader(br)
          transaction.bufStart = bufStart // Make relative to block
          transaction.bufEnd = this.size + br.pos
          transactions.push([index, transaction])
          this.txRead = index + 1

          if (this.options.validate) {
            this.addMerkleHash(index, transaction.getHash())
          }
        }
      } catch (err) {
        br.pos = prePos
        // console.log(err)
      }
    }
    this.size += br.pos
    const remaining = Buffer.from(this.chunk.slice(br.pos)) // New buffer
    this.chunk = remaining.length > 0 ? remaining : null

    const finished = this.finished()

    return {
      size: this.size,
      header: this.header,
      transactions,
      started,
      finished,
      remaining,
      bytesRead: this.size - startSize
    }
  }
}

module.exports = Block
