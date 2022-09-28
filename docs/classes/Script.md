[bsv-minimal](../README.md) / Script

# Class: Script

## Table of contents

### Constructors

- [constructor](Script.md#constructor)

### Properties

- [buffer](Script.md#buffer)
- [chunks](Script.md#chunks)

### Methods

- [getBitcoms](Script.md#getbitcoms)
- [getOpReturn](Script.md#getopreturn)
- [parseBitcoms](Script.md#parsebitcoms)
- [toAddress](Script.md#toaddress)
- [toAddressBuf](Script.md#toaddressbuf)
- [toBuffer](Script.md#tobuffer)
- [fromBuffer](Script.md#frombuffer)
- [fromBufferReader](Script.md#frombufferreader)

## Constructors

### constructor

• `Private` **new Script**(`br`, `chunks`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) |
| `chunks` | [`ScriptChunk`](../interfaces/ScriptChunk.md)[] |

#### Defined in

[script.ts:41](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L41)

## Properties

### buffer

• **buffer**: `Buffer`

#### Defined in

[script.ts:39](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L39)

___

### chunks

• **chunks**: [`ScriptChunk`](../interfaces/ScriptChunk.md)[]

#### Defined in

[script.ts:38](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L38)

## Methods

### getBitcoms

▸ **getBitcoms**(`options?`): `Set`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ScriptGetBitcoms`](../interfaces/ScriptGetBitcoms.md) |

#### Returns

`Set`<`string`\>

#### Defined in

[script.ts:178](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L178)

___

### getOpReturn

▸ **getOpReturn**(): `Buffer`[][]

#### Returns

`Buffer`[][]

#### Defined in

[script.ts:121](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L121)

___

### parseBitcoms

▸ **parseBitcoms**(): [`ScriptBitcom`](../README.md#scriptbitcom)[]

#### Returns

[`ScriptBitcom`](../README.md#scriptbitcom)[]

#### Defined in

[script.ts:149](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L149)

___

### toAddress

▸ **toAddress**(`network?`): `undefined` \| `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `network` | ``"testnet"`` \| ``"mainnet"`` | `"mainnet"` |

#### Returns

`undefined` \| `string`

#### Defined in

[script.ts:221](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L221)

___

### toAddressBuf

▸ **toAddressBuf**(): `undefined` \| `Buffer`

#### Returns

`undefined` \| `Buffer`

#### Defined in

[script.ts:197](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L197)

___

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[script.ts:193](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L193)

___

### fromBuffer

▸ `Static` **fromBuffer**(`buf`, `options?`): [`Script`](Script.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |
| `options` | [`ScriptInitOptions`](../interfaces/ScriptInitOptions.md) |

#### Returns

[`Script`](Script.md)

#### Defined in

[script.ts:95](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L95)

___

### fromBufferReader

▸ `Static` **fromBufferReader**(`br`, `options?`): [`Script`](Script.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) |
| `options` | [`ScriptInitOptions`](../interfaces/ScriptInitOptions.md) |

#### Returns

[`Script`](Script.md)

#### Defined in

[script.ts:100](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L100)
