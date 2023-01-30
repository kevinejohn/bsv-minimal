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
- [toHex](Header.md#tohex)
- [fromBuffer](Header.md#frombuffer)
- [fromBufferReader](Header.md#frombufferreader)
- [fromHex](Header.md#fromhex)

## Constructors

### constructor

• `Private` **new Header**(`br`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) \| [`BufferChunksReader`](utils.BufferChunksReader.md) |

#### Defined in

[header.ts:13](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L13)

## Properties

### bits

• **bits**: `Buffer`

#### Defined in

[header.ts:8](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L8)

___

### buffer

• **buffer**: `Buffer`

#### Defined in

[header.ts:10](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L10)

___

### hash

• `Optional` **hash**: `Buffer`

#### Defined in

[header.ts:11](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L11)

___

### merkleRoot

• **merkleRoot**: `Buffer`

#### Defined in

[header.ts:6](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L6)

___

### nonce

• **nonce**: `number`

#### Defined in

[header.ts:9](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L9)

___

### prevHash

• **prevHash**: `Buffer`

#### Defined in

[header.ts:5](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L5)

___

### time

• **time**: `number`

#### Defined in

[header.ts:7](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L7)

___

### version

• **version**: `Buffer`

#### Defined in

[header.ts:4](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L4)

## Methods

### getHash

▸ **getHash**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[header.ts:47](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L47)

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

[header.ts:48](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L48)

___

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[header.ts:39](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L39)

___

### toHex

▸ **toHex**(): `string`

#### Returns

`string`

#### Defined in

[header.ts:43](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L43)

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

[header.ts:24](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L24)

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

[header.ts:29](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L29)

___

### fromHex

▸ `Static` **fromHex**(`hex`): [`Header`](Header.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `string` |

#### Returns

[`Header`](Header.md)

#### Defined in

[header.ts:34](https://github.com/kevinejohn/bsv-minimal/blob/master/src/header.ts#L34)
