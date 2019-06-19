const bsv = require('bsv')
const Transaction = require('./transaction')
const {
  encoding: { BufferReader },
  crypto: { Hash }
} = bsv

const HEADER_SIZE = 80

function Block () {
  return this
}

/**
 * Instantiate a Block from a Buffer
 *
 * @param {Buffer, Function} - onTransaction(transaction, block) is a callback function
 * @returns {Block}
 * @constructor
 */
Block.fromBuffer = async function fromBuffer (buf, onTransaction) {
  const br = new BufferReader(buf)
  const block = new Block()
  block.hash = Hash.sha256sha256(
    br.buf.slice(br.pos, br.pos + HEADER_SIZE)
  ).reverse()
  block.version = br.readInt32LE()
  block.prevHash = br.readReverse(32)
  block.merkleRoot = br.readReverse(32)
  block.time = br.readUInt32LE()
  block.bits = br.readUInt32LE()
  block.nonce = br.readUInt32LE()
  block.transactions = []
  block.txCount = br.readVarintNum()
  for (var i = 0; i < block.txCount; i++) {
    const transaction = Transaction.fromBufferReader(br)
    if (onTransaction) {
      await onTransaction(transaction, block)
    } else {
      block.transactions.push(transaction)
    }
  }
  return block
}

module.exports = Block
