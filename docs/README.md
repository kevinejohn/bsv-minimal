bsv-minimal

# bsv-minimal

## Table of contents

### Namespaces

- [utils](modules/utils.md)

### Classes

- [Block](classes/Block.md)
- [Header](classes/Header.md)
- [Script](classes/Script.md)
- [Transaction](classes/Transaction.md)

### Interfaces

- [BlockOptions](interfaces/BlockOptions.md)
- [ScriptChunk](interfaces/ScriptChunk.md)
- [ScriptGetBitcoms](interfaces/ScriptGetBitcoms.md)
- [ScriptInitOptions](interfaces/ScriptInitOptions.md)
- [TransactionInput](interfaces/TransactionInput.md)
- [TransactionOutput](interfaces/TransactionOutput.md)

### Type Aliases

- [GetTransactionsAsyncCallback](README.md#gettransactionsasynccallback)

## Type Aliases

### GetTransactionsAsyncCallback

Ƭ **GetTransactionsAsyncCallback**: (`data`: { `finished`: `boolean` ; `header`: [`Header`](classes/Header.md) ; `started`: `boolean` ; `transactions`: [`number`, [`Transaction`](classes/Transaction.md), `number`, `number`][]  }) => `void`

#### Type declaration

▸ (`data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Object` |
| `data.finished` | `boolean` |
| `data.header` | [`Header`](classes/Header.md) |
| `data.started` | `boolean` |
| `data.transactions` | [`number`, [`Transaction`](classes/Transaction.md), `number`, `number`][] |

##### Returns

`void`

#### Defined in

[block.ts:9](https://github.com/andrewrjohn/bsv-minimal/blob/master/src/block.ts#L9)
