const { Block, Header } = require('../src')
const fs = require('fs')
const path = require('path')
const assert = require('assert')

;(() => {
  const blockHex = fs.readFileSync(path.join(__dirname, './block.dat'), 'utf8')
  const blockBuf = Buffer.from(blockHex, 'hex')
  const block = Block.fromBuffer(blockBuf)
  // console.log(block)

  assert(
    block.hash.toString('hex') ===
      '0000000000000000065f5cd65ab43226317d3b1966eb9bf057467d156d34782f'
  )
  assert(
    block.prevHash.toString('hex') ===
      '00000000000000000280aa1a8ba060e60ea5bb55a9e8613a1d9623073868c738'
  )
  assert(block.transactions.length === 26)

  const header = Header.fromBuffer(blockBuf)
  const headerBuf = header.toBuffer()
  const header2 = Header.fromBuffer(headerBuf)
  assert(header.getHash().toString('hex') === header2.getHash().toString('hex'))

  console.log('Passed tests')
})()
