[**bsv-minimal**](../../../../README.md)

***

[bsv-minimal](../../../../README.md) / [utils](../README.md) / BufferChunksReader

# Class: BufferChunksReader

Defined in: [utils/reader\_chunks.ts:4](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L4)

## Constructors

### Constructor

> **new BufferChunksReader**(`bufs`): `BufferChunksReader`

Defined in: [utils/reader\_chunks.ts:11](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L11)

#### Parameters

##### bufs

`Buffer`\<`ArrayBufferLike`\> \| `Buffer`\<`ArrayBufferLike`\>[]

#### Returns

`BufferChunksReader`

## Properties

### bufIndex

> **bufIndex**: `number`

Defined in: [utils/reader\_chunks.ts:7](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L7)

***

### bufPos

> **bufPos**: `number`

Defined in: [utils/reader\_chunks.ts:8](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L8)

***

### bufs

> **bufs**: `Buffer`\<`ArrayBufferLike`\>[]

Defined in: [utils/reader\_chunks.ts:5](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L5)

***

### length

> **length**: `number`

Defined in: [utils/reader\_chunks.ts:9](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L9)

***

### pos

> **pos**: `number`

Defined in: [utils/reader\_chunks.ts:6](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L6)

## Methods

### append()

> **append**(`buf`): `void`

Defined in: [utils/reader\_chunks.ts:23](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L23)

#### Parameters

##### buf

`Buffer`

#### Returns

`void`

***

### eof()

> **eof**(): `boolean`

Defined in: [utils/reader\_chunks.ts:28](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L28)

#### Returns

`boolean`

***

### finished()

> **finished**(): `boolean`

Defined in: [utils/reader\_chunks.ts:32](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L32)

#### Returns

`boolean`

***

### read()

> **read**(`len`, `noBuf?`): `Buffer`\<`ArrayBuffer`\>

Defined in: [utils/reader\_chunks.ts:36](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L36)

#### Parameters

##### len

`number`

##### noBuf?

`boolean` = `false`

#### Returns

`Buffer`\<`ArrayBuffer`\>

***

### readAll()

> **readAll**(): `Buffer`\<`ArrayBuffer`\>

Defined in: [utils/reader\_chunks.ts:101](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L101)

#### Returns

`Buffer`\<`ArrayBuffer`\>

***

### readBigUInt64BE()

> **readBigUInt64BE**(): `bigint`

Defined in: [utils/reader\_chunks.ts:146](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L146)

#### Returns

`bigint`

***

### readBigUInt64LE()

> **readBigUInt64LE**(): `bigint`

Defined in: [utils/reader\_chunks.ts:151](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L151)

#### Returns

`bigint`

***

### readInt32LE()

> **readInt32LE**(): `number`

Defined in: [utils/reader\_chunks.ts:131](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L131)

#### Returns

`number`

***

### readReverse()

> **readReverse**(`len`): `Buffer`\<`ArrayBuffer`\>

Defined in: [utils/reader\_chunks.ts:203](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L203)

#### Parameters

##### len

`number`

#### Returns

`Buffer`\<`ArrayBuffer`\>

***

### readUInt16BE()

> **readUInt16BE**(): `number`

Defined in: [utils/reader\_chunks.ts:111](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L111)

#### Returns

`number`

***

### readUInt16LE()

> **readUInt16LE**(): `number`

Defined in: [utils/reader\_chunks.ts:116](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L116)

#### Returns

`number`

***

### readUInt32BE()

> **readUInt32BE**(): `number`

Defined in: [utils/reader\_chunks.ts:121](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L121)

#### Returns

`number`

***

### readUInt32LE()

> **readUInt32LE**(): `number`

Defined in: [utils/reader\_chunks.ts:126](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L126)

#### Returns

`number`

***

### readUInt64BE()

> **readUInt64BE**(): `number`

Defined in: [utils/reader\_chunks.ts:136](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L136)

#### Returns

`number`

***

### readUInt64BEBI()

> **readUInt64BEBI**(): `bigint`

Defined in: [utils/reader\_chunks.ts:156](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L156)

#### Returns

`bigint`

***

### readUInt64LE()

> **readUInt64LE**(): `number`

Defined in: [utils/reader\_chunks.ts:141](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L141)

#### Returns

`number`

***

### readUInt64LEBI()

> **readUInt64LEBI**(): `bigint`

Defined in: [utils/reader\_chunks.ts:161](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L161)

#### Returns

`bigint`

***

### readUInt8()

> **readUInt8**(): `number`

Defined in: [utils/reader\_chunks.ts:106](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L106)

#### Returns

`number`

***

### readVarintNum()

> **readVarintNum**(): `number`

Defined in: [utils/reader\_chunks.ts:166](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L166)

#### Returns

`number`

***

### readVarLengthBuffer()

> **readVarLengthBuffer**(): `Buffer`\<`ArrayBuffer`\>

Defined in: [utils/reader\_chunks.ts:186](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L186)

#### Returns

`Buffer`\<`ArrayBuffer`\>

***

### rewind()

> **rewind**(`len`): `void`

Defined in: [utils/reader\_chunks.ts:65](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L65)

#### Parameters

##### len

`number`

#### Returns

`void`

***

### slice()

> **slice**(`i`, `j`): `Buffer`\<`ArrayBuffer`\>

Defined in: [utils/reader\_chunks.ts:87](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L87)

#### Parameters

##### i

`number`

##### j

`number`

#### Returns

`Buffer`\<`ArrayBuffer`\>

***

### trim()

> **trim**(): `void`

Defined in: [utils/reader\_chunks.ts:208](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L208)

#### Returns

`void`
