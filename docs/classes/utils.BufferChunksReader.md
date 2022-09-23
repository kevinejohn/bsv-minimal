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

| Name   | Type                   |
| :----- | :--------------------- |
| `bufs` | `Buffer` \| `Buffer`[] |

#### Defined in

[utils/reader_chunks.ts:10](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L10)

## Properties

### bufIndex

• **bufIndex**: `number`

#### Defined in

[utils/reader_chunks.ts:6](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L6)

---

### bufPos

• **bufPos**: `number`

#### Defined in

[utils/reader_chunks.ts:7](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L7)

---

### bufs

• **bufs**: `Buffer`[]

#### Defined in

[utils/reader_chunks.ts:4](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L4)

---

### length

• **length**: `number`

#### Defined in

[utils/reader_chunks.ts:8](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L8)

---

### pos

• **pos**: `number`

#### Defined in

[utils/reader_chunks.ts:5](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L5)

## Methods

### append

▸ **append**(`buf`): `void`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `buf` | `Buffer` |

#### Returns

`void`

#### Defined in

[utils/reader_chunks.ts:22](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L22)

---

### eof

▸ **eof**(): `boolean`

#### Returns

`boolean`

#### Defined in

[utils/reader_chunks.ts:27](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L27)

---

### finished

▸ **finished**(): `boolean`

#### Returns

`boolean`

#### Defined in

[utils/reader_chunks.ts:31](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L31)

---

### read

▸ **read**(`len`, `noBuf?`): `Buffer`

#### Parameters

| Name    | Type      | Default value |
| :------ | :-------- | :------------ |
| `len`   | `number`  | `undefined`   |
| `noBuf` | `boolean` | `false`       |

#### Returns

`Buffer`

#### Defined in

[utils/reader_chunks.ts:35](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L35)

---

### readAll

▸ **readAll**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[utils/reader_chunks.ts:100](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L100)

---

### readBigUInt64BE

▸ **readBigUInt64BE**(): `bigint`

#### Returns

`bigint`

#### Defined in

[utils/reader_chunks.ts:145](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L145)

---

### readBigUInt64LE

▸ **readBigUInt64LE**(): `bigint`

#### Returns

`bigint`

#### Defined in

[utils/reader_chunks.ts:150](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L150)

---

### readInt32LE

▸ **readInt32LE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:130](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L130)

---

### readReverse

▸ **readReverse**(`len`): `Buffer`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `len` | `number` |

#### Returns

`Buffer`

#### Defined in

[utils/reader_chunks.ts:190](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L190)

---

### readUInt16BE

▸ **readUInt16BE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:110](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L110)

---

### readUInt16LE

▸ **readUInt16LE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:115](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L115)

---

### readUInt32BE

▸ **readUInt32BE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:120](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L120)

---

### readUInt32LE

▸ **readUInt32LE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:125](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L125)

---

### readUInt64BE

▸ **readUInt64BE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:135](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L135)

---

### readUInt64BEBI

▸ **readUInt64BEBI**(): `bigint`

#### Returns

`bigint`

#### Defined in

[utils/reader_chunks.ts:155](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L155)

---

### readUInt64LE

▸ **readUInt64LE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:140](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L140)

---

### readUInt64LEBI

▸ **readUInt64LEBI**(): `bigint`

#### Returns

`bigint`

#### Defined in

[utils/reader_chunks.ts:160](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L160)

---

### readUInt8

▸ **readUInt8**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:105](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L105)

---

### readVarLengthBuffer

▸ **readVarLengthBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[utils/reader_chunks.ts:179](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L179)

---

### readVarintNum

▸ **readVarintNum**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader_chunks.ts:165](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L165)

---

### rewind

▸ **rewind**(`len`): `void`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `len` | `number` |

#### Returns

`void`

#### Defined in

[utils/reader_chunks.ts:64](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L64)

---

### slice

▸ **slice**(`i`, `j`): `Buffer`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `i`  | `number` |
| `j`  | `number` |

#### Returns

`Buffer`

#### Defined in

[utils/reader_chunks.ts:86](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L86)

---

### trim

▸ **trim**(): `void`

#### Returns

`void`

#### Defined in

[utils/reader_chunks.ts:195](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader_chunks.ts#L195)
