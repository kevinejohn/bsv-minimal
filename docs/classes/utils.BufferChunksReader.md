[bsv-minimal](../README.md) / [utils](../modules/utils.md) / BufferChunksReader

# Class: BufferChunksReader

[utils](../modules/utils.md).BufferChunksReader

## Table of contents

### Constructors

- [constructor](utils.BufferChunksReader.md#constructor)

### Properties

- [bufIndex](utils.BufferChunksReader.md#bufindex)
- [bufPos](utils.BufferChunksReader.md#bufpos)
- [bufs](utils.BufferChunksReader.md#bufs)
- [length](utils.BufferChunksReader.md#length)
- [pos](utils.BufferChunksReader.md#pos)

### Methods

- [append](utils.BufferChunksReader.md#append)
- [eof](utils.BufferChunksReader.md#eof)
- [finished](utils.BufferChunksReader.md#finished)
- [read](utils.BufferChunksReader.md#read)
- [readAll](utils.BufferChunksReader.md#readall)
- [readBigUInt64BE](utils.BufferChunksReader.md#readbiguint64be)
- [readBigUInt64LE](utils.BufferChunksReader.md#readbiguint64le)
- [readInt32LE](utils.BufferChunksReader.md#readint32le)
- [readReverse](utils.BufferChunksReader.md#readreverse)
- [readUInt16BE](utils.BufferChunksReader.md#readuint16be)
- [readUInt16LE](utils.BufferChunksReader.md#readuint16le)
- [readUInt32BE](utils.BufferChunksReader.md#readuint32be)
- [readUInt32LE](utils.BufferChunksReader.md#readuint32le)
- [readUInt64BE](utils.BufferChunksReader.md#readuint64be)
- [readUInt64BEBI](utils.BufferChunksReader.md#readuint64bebi)
- [readUInt64LE](utils.BufferChunksReader.md#readuint64le)
- [readUInt64LEBI](utils.BufferChunksReader.md#readuint64lebi)
- [readUInt8](utils.BufferChunksReader.md#readuint8)
- [readVarLengthBuffer](utils.BufferChunksReader.md#readvarlengthbuffer)
- [readVarintNum](utils.BufferChunksReader.md#readvarintnum)
- [rewind](utils.BufferChunksReader.md#rewind)
- [slice](utils.BufferChunksReader.md#slice)
- [trim](utils.BufferChunksReader.md#trim)

## Constructors

### constructor

• **new BufferChunksReader**(`bufs`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bufs` | `Buffer` \| `Buffer`[] |

#### Defined in

[utils/reader_chunks.ts:11](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L11)

## Properties

### bufIndex

• **bufIndex**: `number`

#### Defined in

[utils/reader_chunks.ts:7](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L7)

___

### bufPos

• **bufPos**: `number`

#### Defined in

[utils/reader_chunks.ts:8](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L8)

___

### bufs

• **bufs**: `Buffer`[]

#### Defined in

[utils/reader_chunks.ts:5](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L5)

___

### length

• **length**: `number`

#### Defined in

[utils/reader_chunks.ts:9](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L9)

___

### pos

• **pos**: `number`

#### Defined in

[utils/reader_chunks.ts:6](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L6)

## Methods

### append

▸ **append**(`buf`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |

#### Returns

`void`

#### Defined in

[utils/reader_chunks.ts:23](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L23)

___

### eof

▸ **eof**(): `boolean`

#### Returns

`boolean`

#### Defined in

[utils/reader_chunks.ts:28](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L28)

___

### finished

▸ **finished**(): `boolean`

#### Returns

`boolean`

#### Defined in

[utils/reader_chunks.ts:32](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L32)

___

### read

▸ **read**(`len`, `noBuf?`): `Buffer`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `len` | `number` | `undefined` |
| `noBuf` | `boolean` | `false` |

#### Returns

`Buffer`

#### Defined in

[utils/reader_chunks.ts:36](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L36)

___

### readAll

▸ **readAll**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[utils/reader_chunks.ts:101](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L101)

___

### readBigUInt64BE

▸ **readBigUInt64BE**(): `bigint`

#### Returns

`bigint`

#### Defined in

[utils/reader_chunks.ts:146](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L146)

___

### readBigUInt64LE

▸ **readBigUInt64LE**(): `bigint`

#### Returns

`bigint`

#### Defined in

[utils/reader_chunks.ts:151](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L151)

___

### readInt32LE

▸ **readInt32LE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:131](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L131)

___

### readReverse

▸ **readReverse**(`len`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `len` | `number` |

#### Returns

`Buffer`

#### Defined in

[utils/reader_chunks.ts:203](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L203)

___

### readUInt16BE

▸ **readUInt16BE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:111](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L111)

___

### readUInt16LE

▸ **readUInt16LE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:116](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L116)

___

### readUInt32BE

▸ **readUInt32BE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:121](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L121)

___

### readUInt32LE

▸ **readUInt32LE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:126](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L126)

___

### readUInt64BE

▸ **readUInt64BE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:136](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L136)

___

### readUInt64BEBI

▸ **readUInt64BEBI**(): `bigint`

#### Returns

`bigint`

#### Defined in

[utils/reader_chunks.ts:156](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L156)

___

### readUInt64LE

▸ **readUInt64LE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:141](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L141)

___

### readUInt64LEBI

▸ **readUInt64LEBI**(): `bigint`

#### Returns

`bigint`

#### Defined in

[utils/reader_chunks.ts:161](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L161)

___

### readUInt8

▸ **readUInt8**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:106](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L106)

___

### readVarLengthBuffer

▸ **readVarLengthBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[utils/reader_chunks.ts:186](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L186)

___

### readVarintNum

▸ **readVarintNum**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:166](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L166)

___

### rewind

▸ **rewind**(`len`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `len` | `number` |

#### Returns

`void`

#### Defined in

[utils/reader_chunks.ts:65](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L65)

___

### slice

▸ **slice**(`i`, `j`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `i` | `number` |
| `j` | `number` |

#### Returns

`Buffer`

#### Defined in

[utils/reader_chunks.ts:87](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L87)

___

### trim

▸ **trim**(): `void`

#### Returns

`void`

#### Defined in

[utils/reader_chunks.ts:208](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L208)
