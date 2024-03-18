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
- [extendedFormat](Transaction.md#extendedformat)
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

• `Private` **new Transaction**(`br`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) \| [`BufferChunksReader`](utils.BufferChunksReader.md) |
| `options?` | `TransactionOptions` |

#### Defined in

[transaction.ts:49](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L49)

## Properties

### bufEnd

• **bufEnd**: `number`

#### Defined in

[transaction.ts:41](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L41)

___

### bufStart

• **bufStart**: `number`

#### Defined in

[transaction.ts:32](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L32)

___

### buffer

• **buffer**: `Buffer`

#### Defined in

[transaction.ts:42](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L42)

___

### bufferTx

• `Optional` **bufferTx**: `Buffer`

#### Defined in

[transaction.ts:43](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L43)

___

### extendedFormat

• `Optional` **extendedFormat**: `boolean`

#### Defined in

[transaction.ts:47](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L47)

___

### hash

• `Optional` **hash**: `Buffer`

#### Defined in

[transaction.ts:44](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L44)

___

### inputs

• **inputs**: [`TransactionInput`](../interfaces/TransactionInput.md)[]

#### Defined in

[transaction.ts:35](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L35)

___

### length

• **length**: `number`

#### Defined in

[transaction.ts:46](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L46)

___

### nLockTime

• **nLockTime**: `number`

#### Defined in

[transaction.ts:40](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L40)

___

### outputs

• **outputs**: [`TransactionOutput`](../interfaces/TransactionOutput.md)[]

#### Defined in

[transaction.ts:36](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L36)

___

### segwitFlag

• `Optional` **segwitFlag**: `number`

#### Defined in

[transaction.ts:33](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L33)

___

### segwitItems

• `Optional` **segwitItems**: `number`

#### Defined in

[transaction.ts:34](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L34)

___

### sizeTxIns

• **sizeTxIns**: `number`

#### Defined in

[transaction.ts:38](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L38)

___

### sizeTxOuts

• **sizeTxOuts**: `number`

#### Defined in

[transaction.ts:39](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L39)

___

### txid

• `Optional` **txid**: `string`

#### Defined in

[transaction.ts:45](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L45)

___

### version

• **version**: `number`

#### Defined in

[transaction.ts:37](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L37)

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

[transaction.ts:247](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L247)

___

### getCoinbaseHeight

▸ **getCoinbaseHeight**(): `number`

#### Returns

`number`

#### Defined in

[transaction.ts:258](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L258)

___

### getHash

▸ **getHash**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[transaction.ts:183](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L183)

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

[transaction.ts:225](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L225)

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

[transaction.ts:212](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L212)

___

### getTxid

▸ **getTxid**(): `string`

#### Returns

`string`

#### Defined in

[transaction.ts:196](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L196)

___

### getWTxid

▸ **getWTxid**(): `string`

#### Returns

`string`

#### Defined in

[transaction.ts:203](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L203)

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

[transaction.ts:235](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L235)

___

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[transaction.ts:175](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L175)

___

### toHex

▸ **toHex**(): `string`

#### Returns

`string`

#### Defined in

[transaction.ts:179](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L179)

___

### toTxBuffer

▸ **toTxBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[transaction.ts:152](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L152)

___

### fromBuffer

▸ `Static` **fromBuffer**(`buf`, `options?`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |
| `options?` | `TransactionOptions` |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[transaction.ts:134](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L134)

___

### fromBufferReader

▸ `Static` **fromBufferReader**(`br`, `options?`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) \| [`BufferChunksReader`](utils.BufferChunksReader.md) |
| `options?` | `TransactionOptions` |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[transaction.ts:139](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L139)

___

### fromHex

▸ `Static` **fromHex**(`txhex`, `options?`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `txhex` | `string` |
| `options?` | `TransactionOptions` |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[transaction.ts:147](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L147)
