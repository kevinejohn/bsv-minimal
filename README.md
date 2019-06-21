# bsv-minimal

[![NPM Package](https://img.shields.io/npm/v/bsv-minimal.svg?style=flat-square)](https://www.npmjs.org/package/bsv-minimal)

Quickly parse raw block and transaction buffers with minimal overhead

### Use

`npm install --save bsv-minimal`

```
const { Block, Transaction } = require('bsv-minimal)

const block = Block.fromBuffer(yourBlockBuffer)

const transaction = Transaction.fromBuffer(yourTransactionBuffer)
```

### Tests

`npm run test`