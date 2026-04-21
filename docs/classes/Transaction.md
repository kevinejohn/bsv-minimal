[**bsv-minimal**](../README.md)

***

[bsv-minimal](../README.md) / Transaction

# Class: Transaction

Defined in: [transaction.ts:27](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L27)

## Properties

### bufEnd

> **bufEnd**: `number`

Defined in: [transaction.ts:37](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L37)

***

### buffer

> **buffer**: `Buffer`

Defined in: [transaction.ts:38](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L38)

***

### bufferTx?

> `optional` **bufferTx?**: `Buffer`\<`ArrayBufferLike`\>

Defined in: [transaction.ts:39](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L39)

***

### bufStart

> **bufStart**: `number`

Defined in: [transaction.ts:28](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L28)

***

### hash?

> `optional` **hash?**: `Buffer`\<`ArrayBufferLike`\>

Defined in: [transaction.ts:40](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L40)

***

### inputs

> **inputs**: [`TransactionInput`](../interfaces/TransactionInput.md)[]

Defined in: [transaction.ts:31](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L31)

***

### length

> **length**: `number`

Defined in: [transaction.ts:42](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L42)

***

### nLockTime

> **nLockTime**: `number`

Defined in: [transaction.ts:36](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L36)

***

### outputs

> **outputs**: [`TransactionOutput`](../interfaces/TransactionOutput.md)[]

Defined in: [transaction.ts:32](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L32)

***

### segwitFlag?

> `optional` **segwitFlag?**: `number`

Defined in: [transaction.ts:29](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L29)

***

### segwitItems?

> `optional` **segwitItems?**: `number`

Defined in: [transaction.ts:30](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L30)

***

### sizeTxIns

> **sizeTxIns**: `number`

Defined in: [transaction.ts:34](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L34)

***

### sizeTxOuts

> **sizeTxOuts**: `number`

Defined in: [transaction.ts:35](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L35)

***

### txid?

> `optional` **txid?**: `string`

Defined in: [transaction.ts:41](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L41)

***

### version

> **version**: `number`

Defined in: [transaction.ts:33](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L33)

## Methods

### getBitcoms()

> **getBitcoms**(`options?`): `Set`\<`string`\>

Defined in: [transaction.ts:222](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L222)

#### Parameters

##### options?

[`ScriptGetBitcoms`](../interfaces/ScriptGetBitcoms.md)

#### Returns

`Set`\<`string`\>

***

### getCoinbaseHeight()

> **getCoinbaseHeight**(): `number`

Defined in: [transaction.ts:233](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L233)

#### Returns

`number`

***

### getHash()

> **getHash**(): `Buffer`

Defined in: [transaction.ts:158](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L158)

#### Returns

`Buffer`

***

### getOpReturns()

> **getOpReturns**(`options?`): \[`number`, `Buffer`\<`ArrayBufferLike`\>[][]\][]

Defined in: [transaction.ts:200](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L200)

#### Parameters

##### options?

###### singleOpReturn

`boolean` = `false`

#### Returns

\[`number`, `Buffer`\<`ArrayBufferLike`\>[][]\][]

***

### getScripts()

> **getScripts**(`options`): \[`number`, [`Script`](Script.md)\][]

Defined in: [transaction.ts:187](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L187)

#### Parameters

##### options

[`ScriptInitOptions`](../interfaces/ScriptInitOptions.md)

#### Returns

\[`number`, [`Script`](Script.md)\][]

***

### getTxid()

> **getTxid**(): `string`

Defined in: [transaction.ts:171](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L171)

#### Returns

`string`

***

### getWTxid()

> **getWTxid**(): `string`

Defined in: [transaction.ts:178](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L178)

#### Returns

`string`

***

### parseBitcoms()

> **parseBitcoms**(`options?`): [`ScriptBitcom`](../type-aliases/ScriptBitcom.md)[]

Defined in: [transaction.ts:210](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L210)

#### Parameters

##### options?

###### singleOpReturn

`boolean` = `false`

#### Returns

[`ScriptBitcom`](../type-aliases/ScriptBitcom.md)[]

***

### toBuffer()

> **toBuffer**(): `Buffer`\<`ArrayBufferLike`\>

Defined in: [transaction.ts:150](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L150)

#### Returns

`Buffer`\<`ArrayBufferLike`\>

***

### toHex()

> **toHex**(): `string`

Defined in: [transaction.ts:154](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L154)

#### Returns

`string`

***

### toTxBuffer()

> **toTxBuffer**(): `Buffer`\<`ArrayBufferLike`\>

Defined in: [transaction.ts:127](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L127)

#### Returns

`Buffer`\<`ArrayBufferLike`\>

***

### fromBuffer()

> `static` **fromBuffer**(`buf`, `options?`): `Transaction`

Defined in: [transaction.ts:109](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L109)

#### Parameters

##### buf

`Buffer`

##### options?

[`TransactionOptions`](../interfaces/TransactionOptions.md)

#### Returns

`Transaction`

***

### fromBufferReader()

> `static` **fromBufferReader**(`br`, `options?`): `Transaction`

Defined in: [transaction.ts:114](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L114)

#### Parameters

##### br

[`BufferReader`](../bsv-minimal/namespaces/utils/classes/BufferReader.md) \| [`BufferChunksReader`](../bsv-minimal/namespaces/utils/classes/BufferChunksReader.md)

##### options?

[`TransactionOptions`](../interfaces/TransactionOptions.md)

#### Returns

`Transaction`

***

### fromHex()

> `static` **fromHex**(`txhex`, `options?`): `Transaction`

Defined in: [transaction.ts:122](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L122)

#### Parameters

##### txhex

`string`

##### options?

[`TransactionOptions`](../interfaces/TransactionOptions.md)

#### Returns

`Transaction`
