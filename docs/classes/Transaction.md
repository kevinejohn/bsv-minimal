[bsv-minimal](../README.md) / Transaction

# Class: Transaction

## Table of contents

### Constructors

- [constructor](Transaction.md#constructor)

### Properties

- [bufEnd](Transaction.md#bufend)
- [bufStart](Transaction.md#bufstart)
- [buffer](Transaction.md#buffer)
- [bufferTx](Transaction.md#buffertx)
- [hash](Transaction.md#hash)
- [inputs](Transaction.md#inputs)
- [length](Transaction.md#length)
- [nLockTime](Transaction.md#nlocktime)
- [outputs](Transaction.md#outputs)
- [segwitFlag](Transaction.md#segwitflag)
- [segwitItems](Transaction.md#segwititems)
- [sizeTxIns](Transaction.md#sizetxins)
- [sizeTxOuts](Transaction.md#sizetxouts)
- [txid](Transaction.md#txid)
- [version](Transaction.md#version)

### Methods

- [getBitcoms](Transaction.md#getbitcoms)
- [getCoinbaseHeight](Transaction.md#getcoinbaseheight)
- [getHash](Transaction.md#gethash)
- [getOpReturns](Transaction.md#getopreturns)
- [getScripts](Transaction.md#getscripts)
- [getTxid](Transaction.md#gettxid)
- [getWTxid](Transaction.md#getwtxid)
- [parseBitcoms](Transaction.md#parsebitcoms)
- [toBuffer](Transaction.md#tobuffer)
- [toHex](Transaction.md#tohex)
- [toTxBuffer](Transaction.md#totxbuffer)
- [fromBuffer](Transaction.md#frombuffer)
- [fromBufferReader](Transaction.md#frombufferreader)
- [fromHex](Transaction.md#fromhex)

## Constructors

### constructor

• `Private` **new Transaction**(`br`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) \| [`BufferChunksReader`](utils.BufferChunksReader.md) |

#### Defined in

[transaction.ts:40](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L40)

## Properties

### bufEnd

• **bufEnd**: `number`

#### Defined in

[transaction.ts:33](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L33)

___

### bufStart

• **bufStart**: `number`

#### Defined in

[transaction.ts:24](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L24)

___

### buffer

• **buffer**: `Buffer`

#### Defined in

[transaction.ts:34](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L34)

___

### bufferTx

• `Optional` **bufferTx**: `Buffer`

#### Defined in

[transaction.ts:35](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L35)

___

### hash

• `Optional` **hash**: `Buffer`

#### Defined in

[transaction.ts:36](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L36)

___

### inputs

• **inputs**: [`TransactionInput`](../interfaces/TransactionInput.md)[]

#### Defined in

[transaction.ts:27](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L27)

___

### length

• **length**: `number`

#### Defined in

[transaction.ts:38](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L38)

___

### nLockTime

• **nLockTime**: `number`

#### Defined in

[transaction.ts:32](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L32)

___

### outputs

• **outputs**: [`TransactionOutput`](../interfaces/TransactionOutput.md)[]

#### Defined in

[transaction.ts:28](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L28)

___

### segwitFlag

• `Optional` **segwitFlag**: `number`

#### Defined in

[transaction.ts:25](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L25)

___

### segwitItems

• `Optional` **segwitItems**: `number`

#### Defined in

[transaction.ts:26](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L26)

___

### sizeTxIns

• **sizeTxIns**: `number`

#### Defined in

[transaction.ts:30](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L30)

___

### sizeTxOuts

• **sizeTxOuts**: `number`

#### Defined in

[transaction.ts:31](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L31)

___

### txid

• `Optional` **txid**: `string`

#### Defined in

[transaction.ts:37](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L37)

___

### version

• **version**: `number`

#### Defined in

[transaction.ts:29](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L29)

## Methods

### getBitcoms

▸ **getBitcoms**(`options?`): `Set`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`ScriptGetBitcoms`](../interfaces/ScriptGetBitcoms.md) |

#### Returns

`Set`<`string`\>

#### Defined in

[transaction.ts:212](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L212)

___

### getCoinbaseHeight

▸ **getCoinbaseHeight**(): `number`

#### Returns

`number`

#### Defined in

[transaction.ts:223](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L223)

___

### getHash

▸ **getHash**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[transaction.ts:148](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L148)

___

### getOpReturns

▸ **getOpReturns**(`options?`): [`number`, `Buffer`[][]][]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `options` | `Object` | `undefined` |
| `options.singleOpReturn` | `boolean` | `false` |

#### Returns

[`number`, `Buffer`[][]][]

#### Defined in

[transaction.ts:190](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L190)

___

### getScripts

▸ **getScripts**(`options`): [`number`, [`Script`](Script.md)][]

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ScriptInitOptions`](../interfaces/ScriptInitOptions.md) |

#### Returns

[`number`, [`Script`](Script.md)][]

#### Defined in

[transaction.ts:177](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L177)

___

### getTxid

▸ **getTxid**(): `string`

#### Returns

`string`

#### Defined in

[transaction.ts:161](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L161)

___

### getWTxid

▸ **getWTxid**(): `string`

#### Returns

`string`

#### Defined in

[transaction.ts:168](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L168)

___

### parseBitcoms

▸ **parseBitcoms**(`options?`): [`ScriptBitcom`](../README.md#scriptbitcom)[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `options` | `Object` | `undefined` |
| `options.singleOpReturn` | `boolean` | `false` |

#### Returns

[`ScriptBitcom`](../README.md#scriptbitcom)[]

#### Defined in

[transaction.ts:200](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L200)

___

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[transaction.ts:140](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L140)

___

### toHex

▸ **toHex**(): `string`

#### Returns

`string`

#### Defined in

[transaction.ts:144](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L144)

___

### toTxBuffer

▸ **toTxBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[transaction.ts:117](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L117)

___

### fromBuffer

▸ `Static` **fromBuffer**(`buf`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[transaction.ts:102](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L102)

___

### fromBufferReader

▸ `Static` **fromBufferReader**(`br`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) \| [`BufferChunksReader`](utils.BufferChunksReader.md) |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[transaction.ts:107](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L107)

___

### fromHex

▸ `Static` **fromHex**(`txhex`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `txhex` | `string` |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[transaction.ts:112](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L112)
