[bsv-minimal](../README.md) / [utils](../modules/utils.md) / BufferWriter

# Class: BufferWriter

[utils](../modules/utils.md).BufferWriter

## Table of contents

### Constructors

- [constructor](utils.BufferWriter.md#constructor)

### Properties

- [bufLen](utils.BufferWriter.md#buflen)
- [bufs](utils.BufferWriter.md#bufs)

### Methods

- [concat](utils.BufferWriter.md#concat)
- [set](utils.BufferWriter.md#set)
- [toBuffer](utils.BufferWriter.md#tobuffer)
- [write](utils.BufferWriter.md#write)
- [writeInt32LE](utils.BufferWriter.md#writeint32le)
- [writeReverse](utils.BufferWriter.md#writereverse)
- [writeUInt16BE](utils.BufferWriter.md#writeuint16be)
- [writeUInt16LE](utils.BufferWriter.md#writeuint16le)
- [writeUInt32BE](utils.BufferWriter.md#writeuint32be)
- [writeUInt32LE](utils.BufferWriter.md#writeuint32le)
- [writeUInt64BE](utils.BufferWriter.md#writeuint64be)
- [writeUInt64LE](utils.BufferWriter.md#writeuint64le)
- [writeUInt8](utils.BufferWriter.md#writeuint8)
- [writeVarLengthBuffer](utils.BufferWriter.md#writevarlengthbuffer)
- [writeVarintNum](utils.BufferWriter.md#writevarintnum)
- [varintBufNum](utils.BufferWriter.md#varintbufnum)

## Constructors

### constructor

• **new BufferWriter**(`obj?`): [`BufferWriter`](utils.BufferWriter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj?` | [`BufferWriterProperties`](../interfaces/utils.BufferWriterProperties.md) |

#### Returns

[`BufferWriter`](utils.BufferWriter.md)

#### Defined in

[utils/writer.ts:9](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L9)

## Properties

### bufLen

• **bufLen**: `number`

#### Defined in

[utils/writer.ts:7](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L7)

___

### bufs

• **bufs**: `Buffer`[]

#### Defined in

[utils/writer.ts:6](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L6)

## Methods

### concat

▸ **concat**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[utils/writer.ts:34](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L34)

___

### set

▸ **set**(`obj`): [`BufferWriter`](utils.BufferWriter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`BufferWriterProperties`](../interfaces/utils.BufferWriterProperties.md) |

#### Returns

[`BufferWriter`](utils.BufferWriter.md)

#### Defined in

[utils/writer.ts:22](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L22)

___

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[utils/writer.ts:30](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L30)

___

### write

▸ **write**(`buf`): [`BufferWriter`](utils.BufferWriter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |

#### Returns

[`BufferWriter`](utils.BufferWriter.md)

#### Defined in

[utils/writer.ts:38](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L38)

___

### writeInt32LE

▸ **writeInt32LE**(`n`): [`BufferWriter`](utils.BufferWriter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`BufferWriter`](utils.BufferWriter.md)

#### Defined in

[utils/writer.ts:77](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L77)

___

### writeReverse

▸ **writeReverse**(`buf`): [`BufferWriter`](utils.BufferWriter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |

#### Returns

[`BufferWriter`](utils.BufferWriter.md)

#### Defined in

[utils/writer.ts:44](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L44)

___

### writeUInt16BE

▸ **writeUInt16BE**(`n`): [`BufferWriter`](utils.BufferWriter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`BufferWriter`](utils.BufferWriter.md)

#### Defined in

[utils/writer.ts:56](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L56)

___

### writeUInt16LE

▸ **writeUInt16LE**(`n`): [`BufferWriter`](utils.BufferWriter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`BufferWriter`](utils.BufferWriter.md)

#### Defined in

[utils/writer.ts:63](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L63)

___

### writeUInt32BE

▸ **writeUInt32BE**(`n`): [`BufferWriter`](utils.BufferWriter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`BufferWriter`](utils.BufferWriter.md)

#### Defined in

[utils/writer.ts:70](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L70)

___

### writeUInt32LE

▸ **writeUInt32LE**(`n`): [`BufferWriter`](utils.BufferWriter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`BufferWriter`](utils.BufferWriter.md)

#### Defined in

[utils/writer.ts:84](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L84)

___

### writeUInt64BE

▸ **writeUInt64BE**(`bn`): [`BufferWriter`](utils.BufferWriter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bn` | `bigint` |

#### Returns

[`BufferWriter`](utils.BufferWriter.md)

#### Defined in

[utils/writer.ts:91](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L91)

___

### writeUInt64LE

▸ **writeUInt64LE**(`bn`): [`BufferWriter`](utils.BufferWriter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bn` | `bigint` |

#### Returns

[`BufferWriter`](utils.BufferWriter.md)

#### Defined in

[utils/writer.ts:98](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L98)

___

### writeUInt8

▸ **writeUInt8**(`n`): [`BufferWriter`](utils.BufferWriter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`BufferWriter`](utils.BufferWriter.md)

#### Defined in

[utils/writer.ts:49](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L49)

___

### writeVarLengthBuffer

▸ **writeVarLengthBuffer**(`buf`): [`BufferWriter`](utils.BufferWriter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |

#### Returns

[`BufferWriter`](utils.BufferWriter.md)

#### Defined in

[utils/writer.ts:111](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L111)

___

### writeVarintNum

▸ **writeVarintNum**(`n`): [`BufferWriter`](utils.BufferWriter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`BufferWriter`](utils.BufferWriter.md)

#### Defined in

[utils/writer.ts:105](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L105)

___

### varintBufNum

▸ **varintBufNum**(`n`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`Buffer`

#### Defined in

[utils/writer.ts:118](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L118)
