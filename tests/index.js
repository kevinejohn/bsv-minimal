const { Block, Header, Transaction, BlockLite } = require('../src')
const fs = require('fs')
const path = require('path')
const assert = require('assert')

;(async () => {
  const blockHex = fs.readFileSync(path.join(__dirname, './block.dat'), 'utf8')
  const blockBuf = Buffer.from(blockHex, 'hex')
  let block = Block.fromBuffer(blockBuf)
  // console.log(block)
  assert.equal(block.size, 8656)
  assert.equal(block.txCount, 26)

  assert.equal(
    block.getHash().toString('hex'),
    '0000000000000000065f5cd65ab43226317d3b1966eb9bf057467d156d34782f'
  )
  assert.equal(
    block.header.prevHash.toString('hex'),
    '00000000000000000280aa1a8ba060e60ea5bb55a9e8613a1d9623073868c738'
  )
  assert.equal(block.transactions, undefined)
  assert.equal(block.getTransactions().length, 26)

  const header = Header.fromBuffer(blockBuf)
  const headerBuf = header.toBuffer()
  const header2 = Header.fromBuffer(headerBuf)
  assert.equal(
    header.getHash().toString('hex'),
    header2.getHash().toString('hex')
  )

  const tx1 = block.getTransactions()[0]
  const bufTx1 = tx1.toBuffer()
  const tx2 = Transaction.fromBuffer(bufTx1)
  const bufTx2 = tx2.toBuffer()
  assert.equal(Buffer.compare(bufTx1, bufTx2), 0)

  const blockBuf2 = block.toBuffer()
  const block2 = Block.fromBuffer(blockBuf2)
  assert.equal(
    block.getHash().toString('hex'),
    block2.getHash().toString('hex')
  )
  // console.log(block)
  assert.equal(block.getTransactions().length, block2.getTransactions().length)
  assert.equal(block.size, block2.size)
  assert.equal(Buffer.compare(block.toBuffer(), block2.toBuffer()), 0)

  const blockLite = block.toBlockLite()
  const blockLiteBuf = blockLite.toBuffer()
  const blockLite2 = BlockLite.fromBuffer(blockLiteBuf)
  for (let i = 0; i < block.getTransactions().length; i++) {
    assert.equal(
      Buffer.compare(blockLite2.txids[i], block.getTransactions()[i].getHash()),
      0
    )
  }
  const blockLite3 = BlockLite.fromBlockBuffer(blockBuf)
  for (let i = 0; i < block.getTransactions().length; i++) {
    assert.equal(
      Buffer.compare(blockLite3.txids[i], block.getTransactions()[i].getHash()),
      0
    )
  }

  const block3 = Block.fromBlockLite(blockLite2, block.getTransactions())
  assert.equal(Buffer.compare(block3.toBuffer(), block.toBuffer()), 0)

  assert.throws(
    () => {
      Block.fromBlockLite(blockLite2, block.getTransactions().slice(1, -1))
    },
    {
      name: 'Error',
      message: 'Invalid transactions'
    }
  )

  assert.equal(
    block
      .getTransactions()[0]
      .getHash()
      .toString('hex'),
    '70932f8bf487093ae0c8cd4f1d96d09d3fcdbd62d7928adb284cf32ddff17c08'
  )

  let count = 0
  await block.getTransactionsAsync(transaction => {
    // console.log(transaction)
    count++
  })
  assert.equal(count, 26)

  block = Block.fromBuffer(blockBuf)
  count = 0
  await block.getTransactionsAsync(transaction => {
    // console.log(transaction)
    count++
  })
  assert.equal(count, 26)

  console.log('Passed tests')
})()
