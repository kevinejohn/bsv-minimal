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

[script.ts:26](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L26)

## Properties

### buffer

• **buffer**: `Buffer`

#### Defined in

[script.ts:24](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L24)

___

### chunks

• **chunks**: [`ScriptChunk`](../interfaces/ScriptChunk.md)[]

#### Defined in

[script.ts:23](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L23)

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

[script.ts:174](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L174)

___

### getOpReturn

▸ **getOpReturn**(): `Buffer`[][]

#### Returns

`Buffer`[][]

#### Defined in

[script.ts:106](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L106)

___

### parseBitcoms

▸ **parseBitcoms**(): ({ `bitcom`: `string` ; `data`: { `data`: `Buffer` ; `encoding`: `string` ; `map`: `undefined` ; `name`: `string` ; `type`: `string`  }  } \| { `bitcom`: `string` ; `data`: { `data`: `undefined` ; `encoding`: `undefined` ; `map`: `Record`<`string`, `any`\> ; `name`: `undefined` ; `type`: `string`  }  } \| { `bitcom`: `undefined` \| `string` ; `data`: `Buffer`[] = cell })[]

#### Returns

({ `bitcom`: `string` ; `data`: { `data`: `Buffer` ; `encoding`: `string` ; `map`: `undefined` ; `name`: `string` ; `type`: `string`  }  } \| { `bitcom`: `string` ; `data`: { `data`: `undefined` ; `encoding`: `undefined` ; `map`: `Record`<`string`, `any`\> ; `name`: `undefined` ; `type`: `string`  }  } \| { `bitcom`: `undefined` \| `string` ; `data`: `Buffer`[] = cell })[]

#### Defined in

[script.ts:134](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L134)

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

[script.ts:218](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L218)

___

### toAddressBuf

▸ **toAddressBuf**(): ``false`` \| `Buffer`

#### Returns

``false`` \| `Buffer`

#### Defined in

[script.ts:193](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L193)

___

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[script.ts:189](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L189)

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

[script.ts:80](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L80)

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

[script.ts:85](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L85)
