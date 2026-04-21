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
- [toHex](Script.md#tohex)
- [fromBuffer](Script.md#frombuffer)
- [fromBufferReader](Script.md#frombufferreader)
- [fromHex](Script.md#fromhex)

## Constructors

### constructor

• `Private` **new Script**(`br`, `chunks`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `br` | [`BufferReader`](utils.BufferReader.md) |
| `chunks` | [`ScriptChunk`](../interfaces/ScriptChunk.md)[] |

#### Defined in

[script.ts:48](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L48)

## Properties

### buffer

• **buffer**: `Buffer`

#### Defined in

[script.ts:46](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L46)

___

### chunks

• **chunks**: [`ScriptChunk`](../interfaces/ScriptChunk.md)[]

#### Defined in

[script.ts:45](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L45)

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

[script.ts:190](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L190)

___

### getOpReturn

▸ **getOpReturn**(): `Buffer`[][]

#### Returns

`Buffer`[][]

#### Defined in

[script.ts:133](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L133)

___

### parseBitcoms

▸ **parseBitcoms**(): [`ScriptBitcom`](../README.md#scriptbitcom)[]

#### Returns

[`ScriptBitcom`](../README.md#scriptbitcom)[]

#### Defined in

[script.ts:161](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L161)

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

[script.ts:237](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L237)

___

### toAddressBuf

▸ **toAddressBuf**(): `undefined` \| `Buffer`

#### Returns

`undefined` \| `Buffer`

#### Defined in

[script.ts:213](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L213)

___

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[script.ts:205](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L205)

___

### toHex

▸ **toHex**(): `string`

#### Returns

`string`

#### Defined in

[script.ts:209](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L209)

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

[script.ts:102](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L102)

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

[script.ts:107](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L107)

___

### fromHex

▸ `Static` **fromHex**(`hex`): [`Script`](Script.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `string` |

#### Returns

[`Script`](Script.md)

#### Defined in

[script.ts:128](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L128)
