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
- [validate](Block.md#validate)
- [fromBuffer](Block.md#frombuffer)

## Constructors

### constructor

• **new Block**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`BlockOptions`](../interfaces/BlockOptions.md) |

#### Defined in

[block.ts:30](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L30)

## Properties

### br

• `Optional` **br**: [`BufferChunksReader`](utils.BufferChunksReader.md)

#### Defined in

[block.ts:27](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L27)

___

### buffer

• `Optional` **buffer**: `Buffer`

#### Defined in

[block.ts:24](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L24)

___

### computedMerkleRoot

• `Optional` **computedMerkleRoot**: `Buffer`

#### Defined in

[block.ts:26](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L26)

___

### header

• `Optional` **header**: [`Header`](Header.md)

#### Defined in

[block.ts:21](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L21)

___

### height

• `Optional` **height**: `number`

#### Defined in

[block.ts:28](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L28)

___

### merkleArray

• **merkleArray**: `Buffer`[][]

#### Defined in

[block.ts:20](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L20)

___

### options

• **options**: [`BlockOptions`](../interfaces/BlockOptions.md)

#### Defined in

[block.ts:19](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L19)

___

### size

• **size**: `number`

#### Defined in

[block.ts:18](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L18)

___

### transactions

• `Optional` **transactions**: [`Transaction`](Transaction.md)[]

#### Defined in

[block.ts:25](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L25)

___

### txCount

• `Optional` **txCount**: `number`

#### Defined in

[block.ts:22](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L22)

___

### txPos

• `Optional` **txPos**: `number`

#### Defined in

[block.ts:23](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L23)

___

### txRead

• **txRead**: `number`

#### Defined in

[block.ts:17](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L17)

## Methods

### addBufferChunk

▸ **addBufferChunk**(`buf`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `bytesRead` | `number` |
| `bytesRemaining` | `number` |
| `finished` | `boolean` |
| `header` | `undefined` \| [`Header`](Header.md) |
| `height` | `undefined` \| `number` |
| `size` | `number` |
| `started` | `boolean` |
| `transactions` | [`number`, [`Transaction`](Transaction.md), `number`, `number`][] |
| `txCount` | `undefined` \| `number` |

#### Defined in

[block.ts:177](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L177)

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

[block.ts:106](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L106)

___

### finished

▸ **finished**(): `boolean`

#### Returns

`boolean`

#### Defined in

[block.ts:170](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L170)

___

### getHash

▸ **getHash**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[block.ts:48](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L48)

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

[block.ts:49](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L49)

___

### getHeight

▸ **getHeight**(): `number`

#### Returns

`number`

#### Defined in

[block.ts:73](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L73)

___

### getTransactions

▸ **getTransactions**(): [`Transaction`](Transaction.md)[]

#### Returns

[`Transaction`](Transaction.md)[]

#### Defined in

[block.ts:56](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L56)

___

### getTransactionsAsync

▸ **getTransactionsAsync**(`callback`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`GetTransactionsAsyncCallback`](../README.md#gettransactionsasynccallback) |

#### Returns

`Promise`<`void`\>

#### Defined in

[block.ts:140](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L140)

___

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[block.ts:165](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L165)

___

### validate

▸ **validate**(): `void`

#### Returns

`void`

#### Defined in

[block.ts:87](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L87)

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

[block.ts:37](https://github.com/andrewrjohn/bsv-minimal/blob/fca1227/src/block.ts#L37)
