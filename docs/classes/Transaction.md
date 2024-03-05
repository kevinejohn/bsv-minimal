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

• `Private` **new Transaction**(`br`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) \| [`BufferChunksReader`](utils.BufferChunksReader.md) |
| `options?` | `TransactionOptions` |

#### Defined in

[transaction.ts:44](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L44)

## Properties

### bufEnd

• **bufEnd**: `number`

#### Defined in

[transaction.ts:37](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L37)

___

### bufStart

• **bufStart**: `number`

#### Defined in

[transaction.ts:28](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L28)

___

### buffer

• **buffer**: `Buffer`

#### Defined in

[transaction.ts:38](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L38)

___

### bufferTx

• `Optional` **bufferTx**: `Buffer`

#### Defined in

[transaction.ts:39](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L39)

___

### hash

• `Optional` **hash**: `Buffer`

#### Defined in

[transaction.ts:40](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L40)

___

### inputs

• **inputs**: [`TransactionInput`](../interfaces/TransactionInput.md)[]

#### Defined in

[transaction.ts:31](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L31)

___

### length

• **length**: `number`

#### Defined in

[transaction.ts:42](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L42)

___

### nLockTime

• **nLockTime**: `number`

#### Defined in

[transaction.ts:36](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L36)

___

### outputs

• **outputs**: [`TransactionOutput`](../interfaces/TransactionOutput.md)[]

#### Defined in

[transaction.ts:32](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L32)

___

### segwitFlag

• `Optional` **segwitFlag**: `number`

#### Defined in

[transaction.ts:29](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L29)

___

### segwitItems

• `Optional` **segwitItems**: `number`

#### Defined in

[transaction.ts:30](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L30)

___

### sizeTxIns

• **sizeTxIns**: `number`

#### Defined in

[transaction.ts:34](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L34)

___

### sizeTxOuts

• **sizeTxOuts**: `number`

#### Defined in

[transaction.ts:35](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L35)

___

### txid

• `Optional` **txid**: `string`

#### Defined in

[transaction.ts:41](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L41)

___

### version

• **version**: `number`

#### Defined in

[transaction.ts:33](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L33)

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

[transaction.ts:222](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L222)

___

### getCoinbaseHeight

▸ **getCoinbaseHeight**(): `number`

#### Returns

`number`

#### Defined in

[transaction.ts:233](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L233)

___

### getHash

▸ **getHash**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[transaction.ts:158](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L158)

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

[transaction.ts:200](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L200)

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

[transaction.ts:187](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L187)

___

### getTxid

▸ **getTxid**(): `string`

#### Returns

`string`

#### Defined in

[transaction.ts:171](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L171)

___

### getWTxid

▸ **getWTxid**(): `string`

#### Returns

`string`

#### Defined in

[transaction.ts:178](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L178)

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

[transaction.ts:210](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L210)

___

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[transaction.ts:150](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L150)

___

### toHex

▸ **toHex**(): `string`

#### Returns

`string`

#### Defined in

[transaction.ts:154](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L154)

___

### toTxBuffer

▸ **toTxBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[transaction.ts:127](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L127)

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

[transaction.ts:109](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L109)

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

[transaction.ts:114](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L114)

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

[transaction.ts:122](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L122)
