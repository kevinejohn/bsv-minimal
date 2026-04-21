[**bsv-minimal**](../README.md)

***

[bsv-minimal](../README.md) / Script

# Class: Script

Defined in: [script.ts:44](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L44)

## Properties

### buffer

> **buffer**: `Buffer`

Defined in: [script.ts:46](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L46)

***

### chunks

> **chunks**: [`ScriptChunk`](../interfaces/ScriptChunk.md)[]

Defined in: [script.ts:45](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L45)

## Methods

### getBitcoms()

> **getBitcoms**(`options?`): `Set`\<`string`\>

Defined in: [script.ts:190](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L190)

#### Parameters

##### options?

[`ScriptGetBitcoms`](../interfaces/ScriptGetBitcoms.md) = `...`

#### Returns

`Set`\<`string`\>

***

### getOpReturn()

> **getOpReturn**(): `Buffer`\<`ArrayBufferLike`\>[][]

Defined in: [script.ts:133](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L133)

#### Returns

`Buffer`\<`ArrayBufferLike`\>[][]

***

### parseBitcoms()

> **parseBitcoms**(): [`ScriptBitcom`](../type-aliases/ScriptBitcom.md)[]

Defined in: [script.ts:161](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L161)

#### Returns

[`ScriptBitcom`](../type-aliases/ScriptBitcom.md)[]

***

### toAddress()

> **toAddress**(`network?`): `string` \| `undefined`

Defined in: [script.ts:237](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L237)

#### Parameters

##### network?

`"testnet"` \| `"mainnet"`

#### Returns

`string` \| `undefined`

***

### toAddressBuf()

> **toAddressBuf**(): `Buffer`\<`ArrayBufferLike`\> \| `undefined`

Defined in: [script.ts:213](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L213)

#### Returns

`Buffer`\<`ArrayBufferLike`\> \| `undefined`

***

### toBuffer()

> **toBuffer**(): `Buffer`\<`ArrayBufferLike`\>

Defined in: [script.ts:205](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L205)

#### Returns

`Buffer`\<`ArrayBufferLike`\>

***

### toHex()

> **toHex**(): `string`

Defined in: [script.ts:209](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L209)

#### Returns

`string`

***

### fromBuffer()

> `static` **fromBuffer**(`buf`, `options?`): `Script`

Defined in: [script.ts:102](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L102)

#### Parameters

##### buf

`Buffer`

##### options?

[`ScriptInitOptions`](../interfaces/ScriptInitOptions.md) = `{}`

#### Returns

`Script`

***

### fromBufferReader()

> `static` **fromBufferReader**(`br`, `options?`): `Script`

Defined in: [script.ts:107](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L107)

#### Parameters

##### br

[`BufferReader`](../bsv-minimal/namespaces/utils/classes/BufferReader.md)

##### options?

[`ScriptInitOptions`](../interfaces/ScriptInitOptions.md) = `...`

#### Returns

`Script`

***

### fromHex()

> `static` **fromHex**(`hex`): `Script`

Defined in: [script.ts:128](https://github.com/kevinejohn/bsv-minimal/blob/master/src/script.ts#L128)

#### Parameters

##### hex

`string`

#### Returns

`Script`
