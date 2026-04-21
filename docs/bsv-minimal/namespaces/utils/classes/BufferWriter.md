[**bsv-minimal**](../../../../README.md)

***

[bsv-minimal](../../../../README.md) / [utils](../README.md) / BufferWriter

# Class: BufferWriter

Defined in: [utils/writer.ts:5](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L5)

## Constructors

### Constructor

> **new BufferWriter**(`obj?`): `BufferWriter`

Defined in: [utils/writer.ts:9](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L9)

#### Parameters

##### obj?

[`BufferWriterProperties`](../interfaces/BufferWriterProperties.md)

#### Returns

`BufferWriter`

## Properties

### bufLen

> **bufLen**: `number`

Defined in: [utils/writer.ts:7](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L7)

***

### bufs

> **bufs**: `Buffer`\<`ArrayBufferLike`\>[]

Defined in: [utils/writer.ts:6](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L6)

## Methods

### concat()

> **concat**(): `Buffer`\<`ArrayBuffer`\>

Defined in: [utils/writer.ts:34](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L34)

#### Returns

`Buffer`\<`ArrayBuffer`\>

***

### set()

> **set**(`obj`): `BufferWriter`

Defined in: [utils/writer.ts:22](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L22)

#### Parameters

##### obj

[`BufferWriterProperties`](../interfaces/BufferWriterProperties.md)

#### Returns

`BufferWriter`

***

### toBuffer()

> **toBuffer**(): `Buffer`\<`ArrayBuffer`\>

Defined in: [utils/writer.ts:30](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L30)

#### Returns

`Buffer`\<`ArrayBuffer`\>

***

### write()

> **write**(`buf`): `BufferWriter`

Defined in: [utils/writer.ts:38](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L38)

#### Parameters

##### buf

`Buffer`

#### Returns

`BufferWriter`

***

### writeInt32LE()

> **writeInt32LE**(`n`): `BufferWriter`

Defined in: [utils/writer.ts:77](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L77)

#### Parameters

##### n

`number`

#### Returns

`BufferWriter`

***

### writeReverse()

> **writeReverse**(`buf`): `BufferWriter`

Defined in: [utils/writer.ts:44](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L44)

#### Parameters

##### buf

`Buffer`

#### Returns

`BufferWriter`

***

### writeUInt16BE()

> **writeUInt16BE**(`n`): `BufferWriter`

Defined in: [utils/writer.ts:56](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L56)

#### Parameters

##### n

`number`

#### Returns

`BufferWriter`

***

### writeUInt16LE()

> **writeUInt16LE**(`n`): `BufferWriter`

Defined in: [utils/writer.ts:63](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L63)

#### Parameters

##### n

`number`

#### Returns

`BufferWriter`

***

### writeUInt32BE()

> **writeUInt32BE**(`n`): `BufferWriter`

Defined in: [utils/writer.ts:70](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L70)

#### Parameters

##### n

`number`

#### Returns

`BufferWriter`

***

### writeUInt32LE()

> **writeUInt32LE**(`n`): `BufferWriter`

Defined in: [utils/writer.ts:84](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L84)

#### Parameters

##### n

`number`

#### Returns

`BufferWriter`

***

### writeUInt64BE()

> **writeUInt64BE**(`bn`): `BufferWriter`

Defined in: [utils/writer.ts:91](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L91)

#### Parameters

##### bn

`bigint`

#### Returns

`BufferWriter`

***

### writeUInt64LE()

> **writeUInt64LE**(`bn`): `BufferWriter`

Defined in: [utils/writer.ts:98](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L98)

#### Parameters

##### bn

`bigint`

#### Returns

`BufferWriter`

***

### writeUInt8()

> **writeUInt8**(`n`): `BufferWriter`

Defined in: [utils/writer.ts:49](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L49)

#### Parameters

##### n

`number`

#### Returns

`BufferWriter`

***

### writeVarintNum()

> **writeVarintNum**(`n`): `BufferWriter`

Defined in: [utils/writer.ts:105](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L105)

#### Parameters

##### n

`number`

#### Returns

`BufferWriter`

***

### writeVarLengthBuffer()

> **writeVarLengthBuffer**(`buf`): `BufferWriter`

Defined in: [utils/writer.ts:111](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L111)

#### Parameters

##### buf

`Buffer`

#### Returns

`BufferWriter`

***

### varintBufNum()

> `static` **varintBufNum**(`n`): `Buffer`\<`ArrayBuffer`\>

Defined in: [utils/writer.ts:118](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/writer.ts#L118)

#### Parameters

##### n

`number`

#### Returns

`Buffer`\<`ArrayBuffer`\>
