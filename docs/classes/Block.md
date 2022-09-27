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

[block.ts:37](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L37)

## Properties

### br

• `Optional` **br**: [`BufferChunksReader`](utils.BufferChunksReader.md)

#### Defined in

[block.ts:33](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L33)

___

### buffer

• `Optional` **buffer**: `Buffer`

#### Defined in

[block.ts:30](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L30)

___

### computedMerkleRoot

• `Optional` **computedMerkleRoot**: `Buffer`

#### Defined in

[block.ts:32](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L32)

___

### header

• `Optional` **header**: [`Header`](Header.md)

#### Defined in

[block.ts:27](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L27)

___

### height

• `Optional` **height**: `number`

#### Defined in

[block.ts:34](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L34)

___

### merkleArray

• **merkleArray**: `Buffer`[][]

#### Defined in

[block.ts:26](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L26)

___

### options

• **options**: [`BlockOptions`](../interfaces/BlockOptions.md)

#### Defined in

[block.ts:25](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L25)

___

### size

• **size**: `number`

#### Defined in

[block.ts:24](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L24)

___

### startDate

• **startDate**: `number`

#### Defined in

[block.ts:35](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L35)

___

### transactions

• `Optional` **transactions**: [`Transaction`](Transaction.md)[]

#### Defined in

[block.ts:31](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L31)

___

### txCount

• `Optional` **txCount**: `number`

#### Defined in

[block.ts:28](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L28)

___

### txPos

• `Optional` **txPos**: `number`

#### Defined in

[block.ts:29](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L29)

___

### txRead

• **txRead**: `number`

#### Defined in

[block.ts:23](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L23)

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

[block.ts:194](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L194)

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

[block.ts:114](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L114)

___

### finished

▸ **finished**(): `boolean`

#### Returns

`boolean`

#### Defined in

[block.ts:187](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L187)

___

### getHash

▸ **getHash**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[block.ts:56](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L56)

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

[block.ts:57](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L57)

___

### getHeight

▸ **getHeight**(): `number`

#### Returns

`number`

#### Defined in

[block.ts:81](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L81)

___

### getTransactions

▸ **getTransactions**(): [`Transaction`](Transaction.md)[]

#### Returns

[`Transaction`](Transaction.md)[]

#### Defined in

[block.ts:64](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L64)

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

[block.ts:148](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L148)

___

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[block.ts:182](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L182)

___

### validate

▸ **validate**(): `void`

#### Returns

`void`

#### Defined in

[block.ts:95](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L95)

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

[block.ts:45](https://github.com/kevinejohn/bsv-minimal/blob/master/src/block.ts#L45)
