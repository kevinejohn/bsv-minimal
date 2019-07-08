const bsv = require('bsv')
const Transaction = require('./transaction')
const Header = require('./header')
const {
  encoding: { BufferReader }
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
  const header = Header.fromBufferReader(br)
  block.hash = header.getHash()
  block.version = header.version
  block.prevHash = header.prevHash
  block.merkleRoot = header.merkleRoot
  block.time = header.time
  block.bits = header.bits
  block.nonce = header.nonce
  block.transactions = []
  block.txCount = br.readVarintNum()
  for (var i = 0; i < block.txCount; i++) {
    const transaction = Transaction.fromBufferReader(br)
    block.transactions.push(transaction)
  }
  return block
}

module.exports = Block
