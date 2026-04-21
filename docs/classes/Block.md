[**bsv-minimal**](../README.md)

***

[bsv-minimal](../README.md) / Block

# Class: Block

Defined in: [block.ts:33](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L33)

## Constructors

### Constructor

> **new Block**(`options?`): `Block`

Defined in: [block.ts:48](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L48)

#### Parameters

##### options?

[`BlockOptions`](../interfaces/BlockOptions.md) = `{}`

#### Returns

`Block`

## Properties

### br?

> `optional` **br?**: [`BufferChunksReader`](../bsv-minimal/namespaces/utils/classes/BufferChunksReader.md)

Defined in: [block.ts:44](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L44)

***

### buffer?

> `optional` **buffer?**: `Buffer`\<`ArrayBufferLike`\>

Defined in: [block.ts:41](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L41)

***

### computedMerkleRoot?

> `optional` **computedMerkleRoot?**: `Buffer`\<`ArrayBufferLike`\>

Defined in: [block.ts:43](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L43)

***

### header?

> `optional` **header?**: [`Header`](Header.md)

Defined in: [block.ts:38](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L38)

***

### height?

> `optional` **height?**: `number`

Defined in: [block.ts:45](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L45)

***

### merkleArray

> **merkleArray**: `Buffer`\<`ArrayBufferLike`\>[][]

Defined in: [block.ts:37](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L37)

***

### options

> **options**: [`BlockOptions`](../interfaces/BlockOptions.md)

Defined in: [block.ts:36](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L36)

***

### size

> **size**: `number`

Defined in: [block.ts:35](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L35)

***

### startDate

> **startDate**: `number`

Defined in: [block.ts:46](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L46)

***

### transactions?

> `optional` **transactions?**: [`Transaction`](Transaction.md)[]

Defined in: [block.ts:42](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L42)

***

### txCount?

> `optional` **txCount?**: `number`

Defined in: [block.ts:39](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L39)

***

### txPos?

> `optional` **txPos?**: `number`

Defined in: [block.ts:40](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L40)

***

### txRead

> **txRead**: `number`

Defined in: [block.ts:34](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L34)

## Methods

### addBufferChunk()

> **addBufferChunk**(`buf`): [`BlockStream`](../type-aliases/BlockStream.md)

Defined in: [block.ts:214](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L214)

#### Parameters

##### buf

`Buffer`

#### Returns

[`BlockStream`](../type-aliases/BlockStream.md)

***

### addMerkleHash()

> **addMerkleHash**(`index`, `hash`): `void`

Defined in: [block.ts:129](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L129)

#### Parameters

##### index

`number`

##### hash

`Buffer`

#### Returns

`void`

***

### finished()

> **finished**(): `boolean`

Defined in: [block.ts:207](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L207)

#### Returns

`boolean`

***

### getHash()

#### Call Signature

> **getHash**(): `Buffer`

Defined in: [block.ts:72](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L72)

##### Returns

`Buffer`

#### Call Signature

> **getHash**\<`T`\>(`hexStr`): `T` *extends* `true` ? `string` : `Buffer`\<`ArrayBufferLike`\>

Defined in: [block.ts:73](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L73)

##### Type Parameters

###### T

`T` *extends* `boolean`

##### Parameters

###### hexStr

`T`

##### Returns

`T` *extends* `true` ? `string` : `Buffer`\<`ArrayBufferLike`\>

***

### getHeight()

> **getHeight**(): `number`

Defined in: [block.ts:97](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L97)

#### Returns

`number`

***

### getTransactions()

> **getTransactions**(): [`Transaction`](Transaction.md)[]

Defined in: [block.ts:80](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L80)

#### Returns

[`Transaction`](Transaction.md)[]

***

### getTransactionsAsync()

> **getTransactionsAsync**(`callback`): `Promise`\<`void`\>

Defined in: [block.ts:163](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L163)

#### Parameters

##### callback

(`data`) => `void` \| `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### toBuffer()

> **toBuffer**(): `Buffer`\<`ArrayBufferLike`\>

Defined in: [block.ts:198](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L198)

#### Returns

`Buffer`\<`ArrayBufferLike`\>

***

### toHex()

> **toHex**(): `string`

Defined in: [block.ts:203](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L203)

#### Returns

`string`

***

### validate()

> **validate**(): `void`

Defined in: [block.ts:111](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L111)

#### Returns

`void`

***

### fromBuffer()

> `static` **fromBuffer**(`buf`): `Block`

Defined in: [block.ts:56](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L56)

#### Parameters

##### buf

`Buffer`

#### Returns

`Block`

***

### fromHex()

> `static` **fromHex**(`hex`): `Block`

Defined in: [block.ts:67](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L67)

#### Parameters

##### hex

`string`

#### Returns

`Block`
