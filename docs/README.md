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

- [BlockStream](README.md#blockstream)

## Type Aliases

### BlockStream

Ƭ **BlockStream**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bytesRead` | `number` |
| `bytesRemaining` | `number` |
| `finished` | `boolean` |
| `header` | [`Header`](classes/Header.md) |
| `height?` | `number` |
| `size` | `number` |
| `startDate` | `number` |
| `started` | `boolean` |
| `transactions` | [`number`, [`Transaction`](classes/Transaction.md), `number`, `number`][] |
| `txCount` | `number` |

#### Defined in

[block.ts:9](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L9)
