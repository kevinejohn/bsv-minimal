# bsv-minimal

[![NPM Package](https://img.shields.io/npm/v/bsv-minimal.svg?style=flat-square)](https://www.npmjs.org/package/bsv-minimal)

Parse raw bitcoin block and transaction buffers with minimal overhead

## Note

You must use node.js v12+

### Use

`npm install --save bsv-minimal`

```
const { Block, Transaction, Header } = require('bsv-minimal')

const block = Block.fromBuffer(yourBlockBuffer)
block.getHash()
block.getTransactions()
await block.getTransactionsAsync(({ header, transactions, finished }), => {})

const header = Header.fromBuffer(yourHeaderBuffer)
header.getHash()

const transaction = Transaction.fromBuffer(yourTransactionBuffer)
transaction.getHash()
```

### Tests

`npm run test`
