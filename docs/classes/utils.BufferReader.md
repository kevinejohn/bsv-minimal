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
| `buf` | `string` \| [`BufferReaderProperties`](../interfaces/utils.BufferReaderProperties.md) \| `Buffer` |

#### Defined in

[utils/reader.ts:12](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L12)

## Properties

### buf

• **buf**: `Buffer`

#### Defined in

[utils/reader.ts:9](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L9)

___

### pos

• **pos**: `number`

#### Defined in

[utils/reader.ts:10](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L10)

## Methods

### eof

▸ **eof**(): `boolean`

#### Returns

`boolean`

#### Defined in

[utils/reader.ts:37](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L37)

___

### finished

▸ **finished**(): `boolean`

#### Returns

`boolean`

#### Defined in

[utils/reader.ts:41](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L41)

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

[utils/reader.ts:45](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L45)

___

### readAll

▸ **readAll**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[utils/reader.ts:52](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L52)

___

### readInt32LE

▸ **readInt32LE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:88](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L88)

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

[utils/reader.ts:158](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L158)

___

### readUInt16BE

▸ **readUInt16BE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:64](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L64)

___

### readUInt16LE

▸ **readUInt16LE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:70](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L70)

___

### readUInt32BE

▸ **readUInt32BE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:76](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L76)

___

### readUInt32LE

▸ **readUInt32LE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:82](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L82)

___

### readUInt64BE

▸ **readUInt64BE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:94](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L94)

___

### readUInt64BEBI

▸ **readUInt64BEBI**(): `bigint`

#### Returns

`bigint`

#### Defined in

[utils/reader.ts:104](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L104)

___

### readUInt64LE

▸ **readUInt64LE**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:99](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L99)

___

### readUInt64LEBI

▸ **readUInt64LEBI**(): `bigint`

#### Returns

`bigint`

#### Defined in

[utils/reader.ts:110](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L110)

___

### readUInt8

▸ **readUInt8**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:58](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L58)

___

### readVarLengthBuffer

▸ **readVarLengthBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[utils/reader.ts:136](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L136)

___

### readVarintNum

▸ **readVarintNum**(): `number`

#### Returns

`number`

#### Defined in

[utils/reader.ts:116](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L116)

___

### reverse

▸ **reverse**(): [`BufferReader`](utils.BufferReader.md)

#### Returns

[`BufferReader`](utils.BufferReader.md)

#### Defined in

[utils/reader.ts:153](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L153)

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

[utils/reader.ts:33](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L33)
