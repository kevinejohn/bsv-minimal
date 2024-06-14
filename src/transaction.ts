import Script, {
  ScriptGetBitcoms,
  ScriptInitOptions,
  ScriptBitcom,
} from "./script";
import { BufferReader, BufferWriter, BufferChunksReader, Hash } from "./utils";

export interface TransactionInput {
  vin: number;
  scriptBuffer: Buffer;
  prevTxId: Buffer;
  vout: number;
  sequenceNumber: number;
  segwitItems?: Buffer[];
  efPrevTxSats?: number;
  efPrevTxScript?: Buffer;
}

export interface TransactionOutput {
  satoshis: number;
  scriptBuffer: Buffer;
  vout: number;
}

export interface TransactionOptions {
  disableSegwit?: boolean;
}

export const EF_PREFIX = Buffer.from("0000000000EF", "hex");

export default class Transaction {
  bufStart: number;
  segwitFlag?: number;
  segwitItems?: number;
  inputs: TransactionInput[];
  outputs: TransactionOutput[];
  version: number;
  sizeTxIns: number;
  sizeTxOuts: number;
  nLockTime: number;
  bufEnd: number;
  buffer: Buffer;
  bufferTx?: Buffer;
  hash?: Buffer;
  txid?: string;
  length: number;
  extendedFormat?: boolean;

  private constructor(
    br: BufferReader | BufferChunksReader,
    options?: TransactionOptions
  ) {
    const bufStart = br.pos;
    this.bufStart = bufStart;
    this.inputs = [];
    this.outputs = [];
    this.version = br.readInt32LE();
    if (Buffer.compare(br.read(6), EF_PREFIX) === 0) {
      // https://bitcoin-sv.github.io/arc/#/BIP-239
      this.extendedFormat = true;
    } else {
      br.rewind(6);
    }
    this.sizeTxIns = br.readVarintNum();
    if (this.sizeTxIns === 0 && (!options || !options.disableSegwit)) {
      // Segwit serialized tx
      this.segwitFlag = br.readUInt8();
      this.sizeTxIns = br.readVarintNum();
    }
    for (let vin = 0; vin < this.sizeTxIns; vin++) {
      const prevTxId = br.readReverse(32);
      const vout = br.readUInt32LE();
      const scriptBuffer = br.readVarLengthBuffer();
      const sequenceNumber = br.readUInt32LE();

      if (this.extendedFormat) {
        const efPrevTxSats = br.readUInt64LE();
        const efPrevTxScript = br.readVarLengthBuffer();
        this.inputs.push({
          vin,
          scriptBuffer,
          prevTxId,
          vout,
          sequenceNumber,
          efPrevTxSats,
          efPrevTxScript,
        });
      } else {
        this.inputs.push({
          vin,
          scriptBuffer,
          prevTxId,
          vout,
          sequenceNumber,
        });
      }
    }

    this.sizeTxOuts = br.readVarintNum();
    for (let vout = 0; vout < this.sizeTxOuts; vout++) {
      const satoshis = br.readUInt64LE();
      const scriptBuffer = br.readVarLengthBuffer();

      this.outputs.push({
        scriptBuffer,
        satoshis,
        vout,
      });
    }
    if (this.segwitFlag) {
      this.segwitItems = 0;
      for (let vin = 0; vin < this.sizeTxIns; vin++) {
        const itemCount = br.readVarintNum();
        const items: Buffer[] = [];
        for (let i = 0; i < itemCount; i++) {
          const item = br.readVarLengthBuffer();
          items.push(item);
          this.segwitItems++;
        }
        if (items.length > 0) this.inputs[vin].segwitItems = items;
      }
    }
    this.nLockTime = br.readUInt32LE();
    const bufEnd = br.pos;
    this.bufEnd = bufEnd;
    const buffer = br.slice(bufStart, bufEnd);
    if (buffer.length !== bufEnd - bufStart) {
      throw new Error(`Transaction is corrupt`);
    }
    this.buffer = buffer;
    this.length = buffer.length;
  }

  static fromBuffer(buf: Buffer, options?: TransactionOptions) {
    const br = new BufferReader(buf);
    return this.fromBufferReader(br, options);
  }

  static fromBufferReader(
    br: BufferReader | BufferChunksReader,
    options?: TransactionOptions
  ) {
    const transaction = new Transaction(br, options);
    return transaction;
  }

  static fromHex(txhex: string, options?: TransactionOptions) {
    const buf = Buffer.from(txhex, "hex");
    return Transaction.fromBuffer(buf, options);
  }

  toTxBuffer() {
    if (!this.bufferTx) {
      // Constructs tx buffer
      const bw = new BufferWriter();
      bw.writeInt32LE(this.version);
      bw.writeVarintNum(this.sizeTxIns);
      for (const input of this.inputs) {
        bw.writeReverse(input.prevTxId);
        bw.writeUInt32LE(input.vout);
        bw.writeVarLengthBuffer(input.scriptBuffer);
        bw.writeUInt32LE(input.sequenceNumber);
      }
      bw.writeVarintNum(this.sizeTxOuts);
      for (const output of this.outputs) {
        bw.writeUInt64LE(BigInt(output.satoshis));
        bw.writeVarLengthBuffer(output.scriptBuffer);
      }
      bw.writeUInt32LE(this.nLockTime);
      this.bufferTx = bw.toBuffer();
    }
    return this.bufferTx;
  }

  toBuffer() {
    return this.buffer;
  }

  toHex() {
    return this.toBuffer().toString("hex");
  }

  getHash(): Buffer {
    if (!this.hash) {
      if (this.segwitFlag || this.extendedFormat) {
        const buf = this.toTxBuffer();
        this.hash = Hash.sha256sha256(buf).reverse();
      } else {
        const buf = this.toBuffer();
        this.hash = Hash.sha256sha256(buf).reverse();
      }
    }
    return this.hash;
  }

  getTxid() {
    if (!this.txid) {
      this.txid = this.getHash().toString("hex");
    }
    return this.txid;
  }

  getWTxid() {
    if (this.segwitItems) {
      const buf = this.toBuffer();
      return Hash.sha256sha256(buf).reverse().toString("hex");
    } else {
      return this.getTxid();
    }
  }

  getScripts(options: ScriptInitOptions) {
    const scripts: [number, Script][] = [];
    let index = 0;
    for (const output of this.outputs) {
      try {
        const script = Script.fromBuffer(output.scriptBuffer, options);
        scripts.push([index, script]);
      } catch (err) {}
      index++;
    }
    return scripts;
  }

  getOpReturns(options = { singleOpReturn: false }) {
    const opreturns: [number, Buffer[][]][] = [];
    const scripts = this.getScripts({ opreturn: true });
    for (const [index, script] of scripts) {
      opreturns.push([index, script.getOpReturn()]);
      if (options.singleOpReturn) break;
    }
    return opreturns;
  }

  parseBitcoms(options = { singleOpReturn: false }): ScriptBitcom[] {
    const bitcoms: ScriptBitcom[] = [];
    const scripts = this.getScripts({ opreturn: true });
    for (const [, script] of scripts) {
      for (const bitcom of script.parseBitcoms()) {
        bitcoms.push(bitcom);
      }
      if (options.singleOpReturn) break;
    }
    return bitcoms;
  }

  getBitcoms(options?: ScriptGetBitcoms): Set<string> {
    const bitcoms: Set<string> = new Set();
    const scripts = this.getScripts({ opreturn: true });
    for (const [, script] of scripts) {
      script
        .getBitcoms(options)
        .forEach((bitcom: string) => bitcoms.add(bitcom));
    }
    return bitcoms;
  }

  getCoinbaseHeight() {
    // https://en.bitcoin.it/wiki/BIP_0034
    // First block with height 193196
    // Locked in at 227836
    const br = new BufferReader(this.inputs[0].scriptBuffer);
    const bytes = br.readVarintNum();
    if (bytes > 4) throw Error("Invalid height");
    const buf = br.read(bytes);
    const height = buf.readIntLE(0, buf.length);
    if (height <= 216459 || height >= 436459339) throw Error("Invalid height"); // There are a few blocks before lock-in height that give invalid heights
    return height;
  }
}
