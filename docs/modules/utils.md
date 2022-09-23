[bsv-minimal](../README.md) / utils

# Namespace: utils

## Table of contents

### Classes

- [BufferChunksReader](../classes/utils.BufferChunksReader.md)
- [BufferReader](../classes/utils.BufferReader.md)
- [BufferWriter](../classes/utils.BufferWriter.md)

### Interfaces

- [BufferReaderProperties](../interfaces/utils.BufferReaderProperties.md)
- [BufferWriterProperties](../interfaces/utils.BufferWriterProperties.md)

### Variables

- [Base58](utils.md#base58)
- [Hash](utils.md#hash)
- [Opcode](utils.md#opcode)

## Variables

### Base58

• `Const` **Base58**: `Object`

#### Type declaration

| Name     | Type                             |
| :------- | :------------------------------- |
| `decode` | (`source`: `string`) => `Buffer` |
| `encode` | (`source`: `Buffer`) => `string` |

#### Defined in

[utils/base58.ts:121](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/base58.ts#L121)

---

### Hash

• `Const` **Hash**: `Object`

#### Type declaration

| Name              | Type                          |
| :---------------- | :---------------------------- |
| `ripemd160`       | (`buf`: `Buffer`) => `Buffer` |
| `sha256`          | (`buf`: `Buffer`) => `Buffer` |
| `sha256ripemd160` | (`buf`: `Buffer`) => `Buffer` |
| `sha256sha256`    | (`buf`: `Buffer`) => `Buffer` |

#### Defined in

[utils/hash.ts:19](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/hash.ts#L19)

---

### Opcode

• `Const` **Opcode**: `Object`

#### Type declaration

| Name                     | Type  |
| :----------------------- | :---- |
| `OP_0`                   | `0`   |
| `OP_0NOTEQUAL`           | `146` |
| `OP_1`                   | `81`  |
| `OP_10`                  | `90`  |
| `OP_11`                  | `91`  |
| `OP_12`                  | `92`  |
| `OP_13`                  | `93`  |
| `OP_14`                  | `94`  |
| `OP_15`                  | `95`  |
| `OP_16`                  | `96`  |
| `OP_1ADD`                | `139` |
| `OP_1NEGATE`             | `79`  |
| `OP_1SUB`                | `140` |
| `OP_2`                   | `82`  |
| `OP_2DIV`                | `142` |
| `OP_2DROP`               | `109` |
| `OP_2DUP`                | `110` |
| `OP_2MUL`                | `141` |
| `OP_2OVER`               | `112` |
| `OP_2ROT`                | `113` |
| `OP_2SWAP`               | `114` |
| `OP_3`                   | `83`  |
| `OP_3DUP`                | `111` |
| `OP_4`                   | `84`  |
| `OP_5`                   | `85`  |
| `OP_6`                   | `86`  |
| `OP_7`                   | `87`  |
| `OP_8`                   | `88`  |
| `OP_9`                   | `89`  |
| `OP_ABS`                 | `144` |
| `OP_ADD`                 | `147` |
| `OP_AND`                 | `132` |
| `OP_BIN2NUM`             | `129` |
| `OP_BOOLAND`             | `154` |
| `OP_BOOLOR`              | `155` |
| `OP_CAT`                 | `126` |
| `OP_CHECKLOCKTIMEVERIFY` | `177` |
| `OP_CHECKMULTISIG`       | `174` |
| `OP_CHECKMULTISIGVERIFY` | `175` |
| `OP_CHECKSEQUENCEVERIFY` | `178` |
| `OP_CHECKSIG`            | `172` |
| `OP_CHECKSIGVERIFY`      | `173` |
| `OP_CODESEPARATOR`       | `171` |
| `OP_DEPTH`               | `116` |
| `OP_DIV`                 | `150` |
| `OP_DROP`                | `117` |
| `OP_DUP`                 | `118` |
| `OP_ELSE`                | `103` |
| `OP_ENDIF`               | `104` |
| `OP_EQUAL`               | `135` |
| `OP_EQUALVERIFY`         | `136` |
| `OP_FALSE`               | `0`   |
| `OP_FROMALTSTACK`        | `108` |
| `OP_GREATERTHAN`         | `160` |
| `OP_GREATERTHANOREQUAL`  | `162` |
| `OP_HASH160`             | `169` |
| `OP_HASH256`             | `170` |
| `OP_IF`                  | `99`  |
| `OP_IFDUP`               | `115` |
| `OP_INVALIDOPCODE`       | `255` |
| `OP_INVERT`              | `131` |
| `OP_LESSTHAN`            | `159` |
| `OP_LESSTHANOREQUAL`     | `161` |
| `OP_LSHIFT`              | `152` |
| `OP_MAX`                 | `164` |
| `OP_MIN`                 | `163` |
| `OP_MOD`                 | `151` |
| `OP_MUL`                 | `149` |
| `OP_NEGATE`              | `143` |
| `OP_NIP`                 | `119` |
| `OP_NOP`                 | `97`  |
| `OP_NOP1`                | `176` |
| `OP_NOP10`               | `185` |
| `OP_NOP2`                | `177` |
| `OP_NOP3`                | `178` |
| `OP_NOP4`                | `179` |
| `OP_NOP5`                | `180` |
| `OP_NOP6`                | `181` |
| `OP_NOP7`                | `182` |
| `OP_NOP8`                | `183` |
| `OP_NOP9`                | `184` |
| `OP_NOT`                 | `145` |
| `OP_NOTIF`               | `100` |
| `OP_NUM2BIN`             | `128` |
| `OP_NUMEQUAL`            | `156` |
| `OP_NUMEQUALVERIFY`      | `157` |
| `OP_NUMNOTEQUAL`         | `158` |
| `OP_OR`                  | `133` |
| `OP_OVER`                | `120` |
| `OP_PICK`                | `121` |
| `OP_PUBKEY`              | `254` |
| `OP_PUBKEYHASH`          | `253` |
| `OP_PUSHDATA1`           | `76`  |
| `OP_PUSHDATA2`           | `77`  |
| `OP_PUSHDATA4`           | `78`  |
| `OP_RESERVED`            | `80`  |
| `OP_RESERVED1`           | `137` |
| `OP_RESERVED2`           | `138` |
| `OP_RETURN`              | `106` |
| `OP_RIPEMD160`           | `166` |
| `OP_ROLL`                | `122` |
| `OP_ROT`                 | `123` |
| `OP_RSHIFT`              | `153` |
| `OP_SHA1`                | `167` |
| `OP_SHA256`              | `168` |
| `OP_SIZE`                | `130` |
| `OP_SPLIT`               | `127` |
| `OP_SUB`                 | `148` |
| `OP_SWAP`                | `124` |
| `OP_TOALTSTACK`          | `107` |
| `OP_TRUE`                | `81`  |
| `OP_TUCK`                | `125` |
| `OP_VER`                 | `98`  |
| `OP_VERIF`               | `101` |
| `OP_VERIFY`              | `105` |
| `OP_VERNOTIF`            | `102` |
| `OP_WITHIN`              | `165` |
| `OP_XOR`                 | `134` |

#### Defined in

[utils/opcode.ts:1](https://github.com/kevinejohn/bsv-minimal/blob/master/src/utils/opcode.ts#L1)
