const { Block, Header, Transaction, BlockLite } = require('../src')
const fs = require('fs')
const path = require('path')
const assert = require('assert')

;(() => {
  const blockHex = fs.readFileSync(path.join(__dirname, './block.dat'), 'utf8')
  const blockBuf = Buffer.from(blockHex, 'hex')
  const block = Block.fromBuffer(blockBuf)
  // console.log(block)
  assert(block.size === 8656)
  assert(block.txCount === 26)

  assert(
    block.getHash().toString('hex') ===
      '0000000000000000065f5cd65ab43226317d3b1966eb9bf057467d156d34782f'
  )
  assert(
    block.header.prevHash.toString('hex') ===
      '00000000000000000280aa1a8ba060e60ea5bb55a9e8613a1d9623073868c738'
  )
  assert(block.transactions.length === 26)

  const header = Header.fromBuffer(blockBuf)
  const headerBuf = header.toBuffer()
  const header2 = Header.fromBuffer(headerBuf)
  assert(header.getHash().toString('hex') === header2.getHash().toString('hex'))

  const tx1 = block.transactions[0]
  const bufTx1 = tx1.toBuffer()
  const tx2 = Transaction.fromBuffer(bufTx1)
  const bufTx2 = tx2.toBuffer()
  assert(Buffer.compare(bufTx1, bufTx2) === 0)

  const blockBuf2 = block.toBuffer()
  const block2 = Block.fromBuffer(blockBuf2)
  assert(block.getHash().toString('hex') === block2.getHash().toString('hex'))
  // console.log(block)
  assert(block.transactions.length === block2.transactions.length)
  assert(block.size === block2.size)
  assert(Buffer.compare(block.toBuffer(), block2.toBuffer()) === 0)

  const blockLite = block.toBlockLite()
  const blockLiteBuf = blockLite.toBuffer()
  const blockLite2 = BlockLite.fromBuffer(blockLiteBuf)
  for (let i = 0; i < block.transactions.length; i++) {
    assert(
      Buffer.compare(blockLite2.txids[i], block.transactions[i].hash) === 0
    )
  }
  const blockLite3 = BlockLite.fromBlockBuffer(blockBuf)
  for (let i = 0; i < block.transactions.length; i++) {
    assert(
      Buffer.compare(blockLite3.txids[i], block.transactions[i].hash) === 0
    )
  }

  const block3 = Block.fromBlockLite(blockLite2, block.transactions)
  assert(Buffer.compare(block3.toBuffer(), block.toBuffer()) === 0)

  assert.throws(
    () => {
      Block.fromBlockLite(blockLite2, block.transactions.slice(1, -1))
    },
    {
      name: 'Error',
      message: 'Invalid transactions'
    }
  )

  console.log('Passed tests')
})()
