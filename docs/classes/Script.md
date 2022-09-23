[bsv-minimal](../README.md) / Script

# Class: Script

## Table of contents

### Constructors

- [constructor](Script.md#constructor)

### Properties

- [buffer](Script.md#buffer)
- [chunks](Script.md#chunks)
- [opreturn](Script.md#opreturn)

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

[script.ts:27](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/script.ts#L27)

## Properties

### buffer

• **buffer**: `Buffer`

#### Defined in

[script.ts:24](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/script.ts#L24)

___

### chunks

• **chunks**: [`ScriptChunk`](../interfaces/ScriptChunk.md)[]

#### Defined in

[script.ts:23](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/script.ts#L23)

___

### opreturn

• `Optional` **opreturn**: `Buffer`[][]

#### Defined in

[script.ts:25](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/script.ts#L25)

## Methods

### getBitcoms

▸ **getBitcoms**(`options?`): `Set`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ScriptGetBitcoms`](../interfaces/ScriptGetBitcoms.md) |

#### Returns

`Set`<`unknown`\>

#### Defined in

[script.ts:176](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/script.ts#L176)

___

### getOpReturn

▸ **getOpReturn**(): `Buffer`[][]

#### Returns

`Buffer`[][]

#### Defined in

[script.ts:107](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/script.ts#L107)

___

### parseBitcoms

▸ **parseBitcoms**(): ({ `bitcom`: `string` ; `data`: { `data`: `Buffer` ; `encoding`: `string` ; `map`: `undefined` ; `name`: `string` ; `type`: `string`  }  } \| { `bitcom`: `string` ; `data`: { `data`: `undefined` ; `encoding`: `undefined` ; `map`: `Record`<`string`, `any`\> ; `name`: `undefined` ; `type`: `string`  }  } \| { `bitcom`: `undefined` \| `string` ; `data`: `Buffer`[] = cell })[]

#### Returns

({ `bitcom`: `string` ; `data`: { `data`: `Buffer` ; `encoding`: `string` ; `map`: `undefined` ; `name`: `string` ; `type`: `string`  }  } \| { `bitcom`: `string` ; `data`: { `data`: `undefined` ; `encoding`: `undefined` ; `map`: `Record`<`string`, `any`\> ; `name`: `undefined` ; `type`: `string`  }  } \| { `bitcom`: `undefined` \| `string` ; `data`: `Buffer`[] = cell })[]

#### Defined in

[script.ts:136](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/script.ts#L136)

___

### toAddress

▸ **toAddress**(`network?`): `string` \| ``false``

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `network` | ``"testnet"`` \| ``"mainnet"`` | `"mainnet"` |

#### Returns

`string` \| ``false``

#### Defined in

[script.ts:220](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/script.ts#L220)

___

### toAddressBuf

▸ **toAddressBuf**(): ``false`` \| `Buffer`

#### Returns

``false`` \| `Buffer`

#### Defined in

[script.ts:195](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/script.ts#L195)

___

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[script.ts:191](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/script.ts#L191)

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

[script.ts:81](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/script.ts#L81)

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

[script.ts:86](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/script.ts#L86)
