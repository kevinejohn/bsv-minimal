[bsv-minimal](../README.md) / [utils](../modules/utils.md) / BufferReader

# Class: BufferReader

[utils](../modules/utils.md).BufferReader

## Table of contents

### Constructors

- [constructor](utils.BufferReader.md#constructor)

### Properties

- [buf](utils.BufferReader.md#buf)
- [pos](utils.BufferReader.md#pos)

### Methods

- [eof](utils.BufferReader.md#eof)
- [finished](utils.BufferReader.md#finished)
- [read](utils.BufferReader.md#read)
- [readAll](utils.BufferReader.md#readall)
- [readInt32LE](utils.BufferReader.md#readint32le)
- [readReverse](utils.BufferReader.md#readreverse)
- [readUInt16BE](utils.BufferReader.md#readuint16be)
- [readUInt16LE](utils.BufferReader.md#readuint16le)
- [readUInt32BE](utils.BufferReader.md#readuint32be)
- [readUInt32LE](utils.BufferReader.md#readuint32le)
- [readUInt64BE](utils.BufferReader.md#readuint64be)
- [readUInt64BEBI](utils.BufferReader.md#readuint64bebi)
- [readUInt64LE](utils.BufferReader.md#readuint64le)
- [readUInt64LEBI](utils.BufferReader.md#readuint64lebi)
- [readUInt8](utils.BufferReader.md#readuint8)
- [readVarLengthBuffer](utils.BufferReader.md#readvarlengthbuffer)
- [readVarintNum](utils.BufferReader.md#readvarintnum)
- [reverse](utils.BufferReader.md#reverse)
- [slice](utils.BufferReader.md#slice)

## Constructors

### constructor

• **new BufferReader**(`buf`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `string` \| `Buffer` \| [`BufferReaderProperties`](../interfaces/utils.BufferReaderProperties.md) |

#### Defined in

[utils/reader.ts:17](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L17)

## Properties

### buf

• **buf**: `Buffer`

#### Defined in

[utils/reader.ts:14](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L14)

___

### pos

• **pos**: `number`

#### Defined in

[utils/reader.ts:15](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L15)

## Methods

### eof

▸ **eof**(): `boolean`

#### Returns

`boolean`

#### Defined in

[utils/reader.ts:42](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L42)

___

### finished

▸ **finished**(): `boolean`

#### Returns

`boolean`

#### Defined in

[utils/reader.ts:46](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L46)

___

### read

▸ **read**(`len`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `len` | `number` |

#### Returns

`Buffer`

#### Defined in

[utils/reader.ts:50](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L50)

___

### readAll

▸ **readAll**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[utils/reader.ts:59](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L59)

___

### readInt32LE

▸ **readInt32LE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:100](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L100)

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

[utils/reader.ts:173](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L173)

___

### readUInt16BE

▸ **readUInt16BE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:72](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L72)

___

### readUInt16LE

▸ **readUInt16LE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:79](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L79)

___

### readUInt32BE

▸ **readUInt32BE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:86](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L86)

___

### readUInt32LE

▸ **readUInt32LE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:93](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L93)

___

### readUInt64BE

▸ **readUInt64BE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:107](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L107)

___

### readUInt64BEBI

▸ **readUInt64BEBI**(): `bigint`

#### Returns

`bigint`

#### Defined in

[utils/reader.ts:117](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L117)

___

### readUInt64LE

▸ **readUInt64LE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:112](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L112)

___

### readUInt64LEBI

▸ **readUInt64LEBI**(): `bigint`

#### Returns

`bigint`

#### Defined in

[utils/reader.ts:124](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L124)

___

### readUInt8

▸ **readUInt8**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:65](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L65)

___

### readVarLengthBuffer

▸ **readVarLengthBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[utils/reader.ts:151](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L151)

___

### readVarintNum

▸ **readVarintNum**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:131](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L131)

___

### reverse

▸ **reverse**(): [`BufferReader`](utils.BufferReader.md)

#### Returns

[`BufferReader`](utils.BufferReader.md)

#### Defined in

[utils/reader.ts:168](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L168)

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

[utils/reader.ts:38](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L38)
