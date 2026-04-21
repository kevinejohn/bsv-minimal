[**bsv-minimal**](../README.md)

***

[bsv-minimal](../README.md) / Header

# Class: Header

Defined in: [header.ts:3](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L3)

## Properties

### bits

> **bits**: `Buffer`

Defined in: [header.ts:8](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L8)

***

### buffer

> **buffer**: `Buffer`

Defined in: [header.ts:10](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L10)

***

### hash?

> `optional` **hash?**: `Buffer`\<`ArrayBufferLike`\>

Defined in: [header.ts:11](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L11)

***

### merkleRoot

> **merkleRoot**: `Buffer`

Defined in: [header.ts:6](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L6)

***

### nonce

> **nonce**: `number`

Defined in: [header.ts:9](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L9)

***

### prevHash

> **prevHash**: `Buffer`

Defined in: [header.ts:5](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L5)

***

### time

> **time**: `number`

Defined in: [header.ts:7](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L7)

***

### version

> **version**: `Buffer`

Defined in: [header.ts:4](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L4)

## Methods

### getHash()

#### Call Signature

> **getHash**(): `Buffer`

Defined in: [header.ts:47](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L47)

##### Returns

`Buffer`

#### Call Signature

> **getHash**\<`T`\>(`hexStr`): `T` *extends* `true` ? `string` : `Buffer`\<`ArrayBufferLike`\>

Defined in: [header.ts:48](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L48)

##### Type Parameters

###### T

`T` *extends* `boolean`

##### Parameters

###### hexStr

`T`

##### Returns

`T` *extends* `true` ? `string` : `Buffer`\<`ArrayBufferLike`\>

***

### toBuffer()

> **toBuffer**(): `Buffer`\<`ArrayBufferLike`\>

Defined in: [header.ts:39](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L39)

#### Returns

`Buffer`\<`ArrayBufferLike`\>

***

### toHex()

> **toHex**(): `string`

Defined in: [header.ts:43](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L43)

#### Returns

`string`

***

### fromBuffer()

> `static` **fromBuffer**(`buf`): `Header`

Defined in: [header.ts:24](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L24)

#### Parameters

##### buf

`Buffer`

#### Returns

`Header`

***

### fromBufferReader()

> `static` **fromBufferReader**(`br`): `Header`

Defined in: [header.ts:29](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L29)

#### Parameters

##### br

[`BufferReader`](../bsv-minimal/namespaces/utils/classes/BufferReader.md) \| [`BufferChunksReader`](../bsv-minimal/namespaces/utils/classes/BufferChunksReader.md)

#### Returns

`Header`

***

### fromHex()

> `static` **fromHex**(`hex`): `Header`

Defined in: [header.ts:34](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L34)

#### Parameters

##### hex

`string`

#### Returns

`Header`
