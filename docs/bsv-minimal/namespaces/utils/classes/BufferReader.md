[**bsv-minimal**](../../../../README.md)

***

[bsv-minimal](../../../../README.md) / [utils](../README.md) / BufferReader

# Class: BufferReader

Defined in: [utils/reader.ts:13](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L13)

## Constructors

### Constructor

> **new BufferReader**(`buf`): `BufferReader`

Defined in: [utils/reader.ts:17](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L17)

#### Parameters

##### buf

`string` \| `Buffer`\<`ArrayBufferLike`\> \| [`BufferReaderProperties`](../interfaces/BufferReaderProperties.md)

#### Returns

`BufferReader`

## Properties

### buf

> **buf**: `Buffer`\<`ArrayBufferLike`\>

Defined in: [utils/reader.ts:14](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L14)

***

### pos

> **pos**: `number`

Defined in: [utils/reader.ts:15](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L15)

## Methods

### eof()

> **eof**(): `boolean`

Defined in: [utils/reader.ts:42](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L42)

#### Returns

`boolean`

***

### finished()

> **finished**(): `boolean`

Defined in: [utils/reader.ts:46](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L46)

#### Returns

`boolean`

***

### read()

> **read**(`len`): `Buffer`\<`ArrayBuffer`\>

Defined in: [utils/reader.ts:50](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L50)

#### Parameters

##### len

`number`

#### Returns

`Buffer`\<`ArrayBuffer`\>

***

### readAll()

> **readAll**(): `Buffer`\<`ArrayBuffer`\>

Defined in: [utils/reader.ts:59](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L59)

#### Returns

`Buffer`\<`ArrayBuffer`\>

***

### readInt32LE()

> **readInt32LE**(): `number`

Defined in: [utils/reader.ts:100](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L100)

#### Returns

`number`

***

### readReverse()

> **readReverse**(`len`): `Buffer`\<`ArrayBuffer`\>

Defined in: [utils/reader.ts:173](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L173)

#### Parameters

##### len

`number`

#### Returns

`Buffer`\<`ArrayBuffer`\>

***

### readUInt16BE()

> **readUInt16BE**(): `number`

Defined in: [utils/reader.ts:72](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L72)

#### Returns

`number`

***

### readUInt16LE()

> **readUInt16LE**(): `number`

Defined in: [utils/reader.ts:79](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L79)

#### Returns

`number`

***

### readUInt32BE()

> **readUInt32BE**(): `number`

Defined in: [utils/reader.ts:86](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L86)

#### Returns

`number`

***

### readUInt32LE()

> **readUInt32LE**(): `number`

Defined in: [utils/reader.ts:93](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L93)

#### Returns

`number`

***

### readUInt64BE()

> **readUInt64BE**(): `number`

Defined in: [utils/reader.ts:107](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L107)

#### Returns

`number`

***

### readUInt64BEBI()

> **readUInt64BEBI**(): `bigint`

Defined in: [utils/reader.ts:117](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L117)

#### Returns

`bigint`

***

### readUInt64LE()

> **readUInt64LE**(): `number`

Defined in: [utils/reader.ts:112](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L112)

#### Returns

`number`

***

### readUInt64LEBI()

> **readUInt64LEBI**(): `bigint`

Defined in: [utils/reader.ts:124](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L124)

#### Returns

`bigint`

***

### readUInt8()

> **readUInt8**(): `number`

Defined in: [utils/reader.ts:65](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L65)

#### Returns

`number`

***

### readVarintNum()

> **readVarintNum**(): `number`

Defined in: [utils/reader.ts:131](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L131)

#### Returns

`number`

***

### readVarLengthBuffer()

> **readVarLengthBuffer**(): `Buffer`\<`ArrayBuffer`\>

Defined in: [utils/reader.ts:151](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L151)

#### Returns

`Buffer`\<`ArrayBuffer`\>

***

### reverse()

> **reverse**(): `BufferReader`

Defined in: [utils/reader.ts:168](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L168)

#### Returns

`BufferReader`

***

### slice()

> **slice**(`i`, `j`): `Buffer`\<`ArrayBuffer`\>

Defined in: [utils/reader.ts:38](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/reader.ts#L38)

#### Parameters

##### i

`number`

##### j

`number`

#### Returns

`Buffer`\<`ArrayBuffer`\>
