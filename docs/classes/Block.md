[bsv-minimal](../README.md) / Block

# Class: Block

## Table of contents

### Constructors

- [constructor](Block.md#constructor)

### Properties

- [br](Block.md#br)
- [buffer](Block.md#buffer)
- [computedMerkleRoot](Block.md#computedmerkleroot)
- [header](Block.md#header)
- [height](Block.md#height)
- [merkleArray](Block.md#merklearray)
- [options](Block.md#options)
- [size](Block.md#size)
- [startDate](Block.md#startdate)
- [transactions](Block.md#transactions)
- [txCount](Block.md#txcount)
- [txPos](Block.md#txpos)
- [txRead](Block.md#txread)

### Methods

- [addBufferChunk](Block.md#addbufferchunk)
- [addMerkleHash](Block.md#addmerklehash)
- [finished](Block.md#finished)
- [getHash](Block.md#gethash)
- [getHeight](Block.md#getheight)
- [getTransactions](Block.md#gettransactions)
- [getTransactionsAsync](Block.md#gettransactionsasync)
- [toBuffer](Block.md#tobuffer)
- [toHex](Block.md#tohex)
- [validate](Block.md#validate)
- [fromBuffer](Block.md#frombuffer)
- [fromHex](Block.md#fromhex)

## Constructors

### constructor

• **new Block**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`BlockOptions`](../interfaces/BlockOptions.md) |

#### Defined in

[block.ts:45](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L45)

## Properties

### br

• `Optional` **br**: [`BufferChunksReader`](utils.BufferChunksReader.md)

#### Defined in

[block.ts:41](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L41)

___

### buffer

• `Optional` **buffer**: `Buffer`

#### Defined in

[block.ts:38](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L38)

___

### computedMerkleRoot

• `Optional` **computedMerkleRoot**: `Buffer`

#### Defined in

[block.ts:40](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L40)

___

### header

• `Optional` **header**: [`Header`](Header.md)

#### Defined in

[block.ts:35](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L35)

___

### height

• `Optional` **height**: `number`

#### Defined in

[block.ts:42](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L42)

___

### merkleArray

• **merkleArray**: `Buffer`[][]

#### Defined in

[block.ts:34](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L34)

___

### options

• **options**: [`BlockOptions`](../interfaces/BlockOptions.md)

#### Defined in

[block.ts:33](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L33)

___

### size

• **size**: `number`

#### Defined in

[block.ts:32](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L32)

___

### startDate

• **startDate**: `number`

#### Defined in

[block.ts:43](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L43)

___

### transactions

• `Optional` **transactions**: [`Transaction`](Transaction.md)[]

#### Defined in

[block.ts:39](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L39)

___

### txCount

• `Optional` **txCount**: `number`

#### Defined in

[block.ts:36](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L36)

___

### txPos

• `Optional` **txPos**: `number`

#### Defined in

[block.ts:37](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L37)

___

### txRead

• **txRead**: `number`

#### Defined in

[block.ts:31](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L31)

## Methods

### addBufferChunk

▸ **addBufferChunk**(`buf`): [`BlockStream`](../README.md#blockstream)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |

#### Returns

[`BlockStream`](../README.md#blockstream)

#### Defined in

[block.ts:212](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L212)

___

### addMerkleHash

▸ **addMerkleHash**(`index`, `hash`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `hash` | `Buffer` |

#### Returns

`void`

#### Defined in

[block.ts:127](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L127)

___

### finished

▸ **finished**(): `boolean`

#### Returns

`boolean`

#### Defined in

[block.ts:205](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L205)

___

### getHash

▸ **getHash**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[block.ts:69](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L69)

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

[block.ts:70](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L70)

___

### getHeight

▸ **getHeight**(): `number`

#### Returns

`number`

#### Defined in

[block.ts:94](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L94)

___

### getTransactions

▸ **getTransactions**(): [`Transaction`](Transaction.md)[]

#### Returns

[`Transaction`](Transaction.md)[]

#### Defined in

[block.ts:77](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L77)

___

### getTransactionsAsync

▸ **getTransactionsAsync**(`callback`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`data`: [`BlockStream`](../README.md#blockstream)) => `void` \| `Promise`<`void`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[block.ts:161](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L161)

___

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[block.ts:196](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L196)

___

### toHex

▸ **toHex**(): `string`

#### Returns

`string`

#### Defined in

[block.ts:201](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L201)

___

### validate

▸ **validate**(): `void`

#### Returns

`void`

#### Defined in

[block.ts:108](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L108)

___

### fromBuffer

▸ `Static` **fromBuffer**(`buf`): [`Block`](Block.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |

#### Returns

[`Block`](Block.md)

#### Defined in

[block.ts:53](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L53)

___

### fromHex

▸ `Static` **fromHex**(`hex`): [`Block`](Block.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `hex` | `string` |

#### Returns

[`Block`](Block.md)

#### Defined in

[block.ts:64](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L64)
