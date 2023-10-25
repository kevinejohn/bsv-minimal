# bsv-minimal

[![NPM Package](https://img.shields.io/npm/v/bsv-minimal.svg?style=flat-square)](https://www.npmjs.org/package/bsv-minimal)

Parse raw bitcoin block and transaction buffers with minimal overhead

## Note

You must use node.js v12+

### Install

`npm i bsv-minimal`

### Documentation

- [View detailed documentation here](docs/README.md)

### Basic use

```js
const { Block, Transaction, Header } = require('bsv-minimal')

const block = Block.fromBuffer(yourBlockBuffer)
block.getHash()
block.getTransactions()
block.getHeight()
await block.getTransactionsAsync(({ header, txs, finished }), => {
    for (const {index, tx, offset, size} of txs) {
        console.log(`tx ${tx.getTxid()}`)
    }
})

const header = Header.fromBuffer(yourHeaderBuffer)
header.getHash()

const transaction = Transaction.fromBuffer(yourTransactionBuffer)
transaction.getTxid()
transaction.getCoinbaseHeight()
```

### Tests

`npm run test`
