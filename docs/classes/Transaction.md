[bsv-minimal](../README.md) / Transaction

# Class: Transaction

## Table of contents

### Constructors

- [constructor](Transaction.md#constructor)

### Properties

- [bufEnd](Transaction.md#bufend)
- [bufStart](Transaction.md#bufstart)
- [buffer](Transaction.md#buffer)
- [hash](Transaction.md#hash)
- [inputs](Transaction.md#inputs)
- [length](Transaction.md#length)
- [nLockTime](Transaction.md#nlocktime)
- [outputs](Transaction.md#outputs)
- [sizeTxIns](Transaction.md#sizetxins)
- [sizeTxOuts](Transaction.md#sizetxouts)
- [version](Transaction.md#version)

### Methods

- [getBitcoms](Transaction.md#getbitcoms)
- [getCoinbaseHeight](Transaction.md#getcoinbaseheight)
- [getHash](Transaction.md#gethash)
- [getOpReturns](Transaction.md#getopreturns)
- [getScripts](Transaction.md#getscripts)
- [getTxid](Transaction.md#gettxid)
- [parseBitcoms](Transaction.md#parsebitcoms)
- [toBuffer](Transaction.md#tobuffer)
- [fromBuffer](Transaction.md#frombuffer)
- [fromBufferReader](Transaction.md#frombufferreader)

## Constructors

### constructor

• `Private` **new Transaction**(`br`)

#### Parameters

| Name | Type                                                                                           |
| :--- | :--------------------------------------------------------------------------------------------- |
| `br` | [`BufferReader`](utils.BufferReader.md) \| [`BufferChunksReader`](utils.BufferChunksReader.md) |

#### Defined in

[transaction.ts:31](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L31)

## Properties

### bufEnd

• **bufEnd**: `number`

#### Defined in

[transaction.ts:26](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L26)

---

### bufStart

• **bufStart**: `number`

#### Defined in

[transaction.ts:19](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L19)

---

### buffer

• **buffer**: `Buffer`

#### Defined in

[transaction.ts:27](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L27)

---

### hash

• `Optional` **hash**: `Buffer`

#### Defined in

[transaction.ts:28](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L28)

---

### inputs

• **inputs**: [`TransactionInput`](../interfaces/TransactionInput.md)[]

#### Defined in

[transaction.ts:20](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L20)

---

### length

• **length**: `number`

#### Defined in

[transaction.ts:29](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L29)

---

### nLockTime

• **nLockTime**: `number`

#### Defined in

[transaction.ts:25](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L25)

---

### outputs

• **outputs**: [`TransactionOutput`](../interfaces/TransactionOutput.md)[]

#### Defined in

[transaction.ts:21](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L21)

---

### sizeTxIns

• **sizeTxIns**: `number`

#### Defined in

[transaction.ts:23](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L23)

---

### sizeTxOuts

• **sizeTxOuts**: `number`

#### Defined in

[transaction.ts:24](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L24)

---

### version

• **version**: `number`

#### Defined in

[transaction.ts:22](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L22)

## Methods

### getBitcoms

▸ **getBitcoms**(`options?`): `Set`<`unknown`\>

#### Parameters

| Name       | Type                                                    |
| :--------- | :------------------------------------------------------ |
| `options?` | [`ScriptGetBitcoms`](../interfaces/ScriptGetBitcoms.md) |

#### Returns

`Set`<`unknown`\>

#### Defined in

[transaction.ts:138](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L138)

---

### getCoinbaseHeight

▸ **getCoinbaseHeight**(): `number`

#### Returns

`number`

#### Defined in

[transaction.ts:147](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L147)

---

### getHash

▸ **getHash**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[transaction.ts:89](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L89)

▸ **getHash**<`T`\>(`hexStr`): `T` extends `true` ? `string` : `Buffer`

#### Type parameters

| Name | Type              |
| :--- | :---------------- |
| `T`  | extends `boolean` |

#### Parameters

| Name     | Type |
| :------- | :--- |
| `hexStr` | `T`  |

#### Returns

`T` extends `true` ? `string` : `Buffer`

#### Defined in

[transaction.ts:90](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L90)

---

### getOpReturns

▸ **getOpReturns**(`options?`): [`number`, `Buffer`[][]][]

#### Parameters

| Name                     | Type      | Default value |
| :----------------------- | :-------- | :------------ |
| `options`                | `Object`  | `undefined`   |
| `options.singleOpReturn` | `boolean` | `false`       |

#### Returns

[`number`, `Buffer`[][]][]

#### Defined in

[transaction.ts:116](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L116)

---

### getScripts

▸ **getScripts**(`options`): [`number`, [`Script`](Script.md)][]

#### Parameters

| Name      | Type                                                      |
| :-------- | :-------------------------------------------------------- |
| `options` | [`ScriptInitOptions`](../interfaces/ScriptInitOptions.md) |

#### Returns

[`number`, [`Script`](Script.md)][]

#### Defined in

[transaction.ts:103](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L103)

---

### getTxid

▸ **getTxid**(): `string`

#### Returns

`string`

#### Defined in

[transaction.ts:99](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L99)

---

### parseBitcoms

▸ **parseBitcoms**(`options?`): ({ `bitcom`: `string` ; `data`: { `data`: `Buffer` ; `encoding`: `string` ; `map`: `undefined` ; `name`: `string` ; `type`: `string` } } \| { `bitcom`: `string` ; `data`: { `data`: `undefined` ; `encoding`: `undefined` ; `map`: `Record`<`string`, `any`\> ; `name`: `undefined` ; `type`: `string` } } \| { `bitcom`: `undefined` \| `string` ; `data`: `Buffer`[] = cell })[]

#### Parameters

| Name                     | Type      | Default value |
| :----------------------- | :-------- | :------------ |
| `options`                | `Object`  | `undefined`   |
| `options.singleOpReturn` | `boolean` | `false`       |

#### Returns

({ `bitcom`: `string` ; `data`: { `data`: `Buffer` ; `encoding`: `string` ; `map`: `undefined` ; `name`: `string` ; `type`: `string` } } \| { `bitcom`: `string` ; `data`: { `data`: `undefined` ; `encoding`: `undefined` ; `map`: `Record`<`string`, `any`\> ; `name`: `undefined` ; `type`: `string` } } \| { `bitcom`: `undefined` \| `string` ; `data`: `Buffer`[] = cell })[]

#### Defined in

[transaction.ts:126](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L126)

---

### toBuffer

▸ **toBuffer**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

[transaction.ts:85](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L85)

---

### fromBuffer

▸ `Static` **fromBuffer**(`buf`): [`Transaction`](Transaction.md)

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `buf` | `Buffer` |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[transaction.ts:75](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L75)

---

### fromBufferReader

▸ `Static` **fromBufferReader**(`br`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type                                                                                           |
| :--- | :--------------------------------------------------------------------------------------------- |
| `br` | [`BufferReader`](utils.BufferReader.md) \| [`BufferChunksReader`](utils.BufferChunksReader.md) |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

[transaction.ts:80](https://github.com/kevinejohn/bsv-minimal/blob/master/src/transaction.ts#L80)
