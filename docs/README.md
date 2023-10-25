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
- [ScriptBitcom](README.md#scriptbitcom)
- [TxIndex](README.md#txindex)

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
| `txCount` | `number` |
| `txRead` | `number` |
| `txs` | [`TxIndex`](README.md#txindex)[] |

#### Defined in

[block.ts:16](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L16)

___

### ScriptBitcom

Ƭ **ScriptBitcom**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut?` | { `data`: `Buffer` ; `encoding`: `string` ; `name`: `string` ; `type`: `string`  } |
| `19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut.data` | `Buffer` |
| `19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut.encoding` | `string` |
| `19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut.name` | `string` |
| `19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut.type` | `string` |
| `1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5?` | { `map`: { `[key: string]`: `string`;  } ; `type`: `string`  } |
| `1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5.map` | { `[key: string]`: `string`;  } |
| `1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5.type` | `string` |
| `bitcom` | `string` |
| `data` | `Buffer`[] |

#### Defined in

[script.ts:22](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L22)

___

### TxIndex

Ƭ **TxIndex**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `offset` | `number` |
| `size` | `number` |
| `tx` | [`Transaction`](classes/Transaction.md) |

#### Defined in

[block.ts:9](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L9)
