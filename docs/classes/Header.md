[bsv-minimal](../README.md) / Header

# Class: Header

## Table of contents

### Constructors

- [constructor](Header.md#constructor)

### Properties

- [bits](Header.md#bits)
- [buffer](Header.md#buffer)
- [hash](Header.md#hash)
- [merkleRoot](Header.md#merkleroot)
- [nonce](Header.md#nonce)
- [prevHash](Header.md#prevhash)
- [time](Header.md#time)
- [version](Header.md#version)

### Methods

- [getHash](Header.md#gethash)
- [toBuffer](Header.md#tobuffer)
- [fromBuffer](Header.md#frombuffer)
- [fromBufferReader](Header.md#frombufferreader)

## Constructors

### constructor

• `Private` **new Header**(`br`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) \| [`BufferChunksReader`](utils.BufferChunksReader.md) |

#### Defined in

[header.ts:13](https://github.com/kevinejohn/bsv-minimal/blob/e0eff02/src/header.ts#L13)

## Properties

### bits

• **bits**: `Buffer`

#### Defined in

[header.ts:8](https://github.com/kevinejohn/bsv-minimal/blob/e0eff02/src/header.ts#L8)

___

### buffer

• **buffer**: `Buffer`

#### Defined in

[header.ts:10](https://github.com/kevinejohn/bsv-minimal/blob/e0eff02/src/header.ts#L10)

___

### hash

• `Optional` **hash**: `Buffer`

#### Defined in

[header.ts:11](https://github.com/kevinejohn/bsv-minimal/blob/e0eff02/src/header.ts#L11)

___

### merkleRoot

• **merkleRoot**: `Buffer`

#### Defined in

[header.ts:6](https://github.com/kevinejohn/bsv-minimal/blob/e0eff02/src/header.ts#L6)

___

### nonce

• **nonce**: `number`

#### Defined in

[header.ts:9](https://github.com/kevinejohn/bsv-minimal/blob/e0eff02/src/header.ts#L9)

___

### prevHash

• **prevHash**: `Buffer`

#### Defined in

[header.ts:5](https://github.com/kevinejohn/bsv-minimal/blob/e0eff02/src/header.ts#L5)

___

### time

• **time**: `number`

#### Defined in

[header.ts:7](https://github.com/kevinejohn/bsv-minimal/blob/e0eff02/src/header.ts#L7)

___

### version

• **version**: `Buffer`

#### Defined in

[header.ts:4](https://github.com/kevinejohn/bsv-minimal/blob/e0eff02/src/header.ts#L4)

## Methods

### getHash

▸ **getHash**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[header.ts:38](https://github.com/kevinejohn/bsv-minimal/blob/e0eff02/src/header.ts#L38)

▸ **getHash**<`T`\>(`hexStr`): `T` extends ``true`` ? `string` : `Buffer`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexStr` | `T` |

#### Returns

`T` extends ``true`` ? `string` : `Buffer`

#### Defined in

[header.ts:39](https://github.com/kevinejohn/bsv-minimal/blob/e0eff02/src/header.ts#L39)

___

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[header.ts:34](https://github.com/kevinejohn/bsv-minimal/blob/e0eff02/src/header.ts#L34)

___

### fromBuffer

▸ `Static` **fromBuffer**(`buf`): [`Header`](Header.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |

#### Returns

[`Header`](Header.md)

#### Defined in

[header.ts:24](https://github.com/kevinejohn/bsv-minimal/blob/e0eff02/src/header.ts#L24)

___

### fromBufferReader

▸ `Static` **fromBufferReader**(`br`): [`Header`](Header.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) \| [`BufferChunksReader`](utils.BufferChunksReader.md) |

#### Returns

[`Header`](Header.md)

#### Defined in

[header.ts:29](https://github.com/kevinejohn/bsv-minimal/blob/e0eff02/src/header.ts#L29)
