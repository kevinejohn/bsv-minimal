import { ScriptOptions } from "vm";
import Script, { ScriptGetBitcoms, ScriptInitOptions } from "./script";
import { BufferReader, Hash } from "./utils";

interface TransactionInput {
  vin: number;
  scriptBuffer: Buffer;
  prevTxId: Buffer;
  vout: number;
  sequenceNumber: number;
}

interface TransactionOutput {
  satoshis: number;
  scriptBuffer: Buffer;
  vout: number;
}

export default class Transaction {
  bufStart: number;
  inputs: TransactionInput[];
  outputs: TransactionOutput[];
  version: number;
  sizeTxIns: number;
  sizeTxOuts: number;
  nLockTime: number;
  bufEnd: number;
  buffer: Buffer;
  hash?: Buffer;

  private constructor(br: BufferReader) {
    const bufStart = br.pos;
    this.bufStart = bufStart;
    this.inputs = [];
    this.outputs = [];
    this.version = br.readInt32LE();
    this.sizeTxIns = br.readVarintNum();
    for (let vin = 0; vin < this.sizeTxIns; vin++) {
      const prevTxId = br.readReverse(32);
      const vout = br.readUInt32LE();
      const scriptBuffer = br.readVarLengthBuffer();
      const sequenceNumber = br.readUInt32LE();

      this.inputs.push({
        vin,
        scriptBuffer,
        prevTxId,
        vout,
        sequenceNumber,
      });
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
    this.nLockTime = br.readUInt32LE();
    const bufEnd = br.pos;
    this.bufEnd = bufEnd;
    const buffer = br.slice(bufStart, bufEnd);
    if (buffer.length !== bufEnd - bufStart) {
      throw new Error(`Transaction is corrupt`);
    }
    this.buffer = buffer;
  }

  static fromBuffer(buf: Buffer) {
    const br = new BufferReader(buf);
    return this.fromBufferReader(br);
  }

  static fromBufferReader(br: BufferReader) {
    const transaction = new Transaction(br);
    return transaction;
  }

  toBuffer() {
    return this.buffer;
  }

  getHash(): Buffer;
  getHash<T extends boolean>(hexStr: T): T extends true ? string : Buffer;
  getHash(hexStr = false) {
    if (!this.hash) {
      const buf = this.toBuffer();
      this.hash = Hash.sha256sha256(buf).reverse();
    }
    return hexStr ? this.hash.toString("hex") : this.hash;
  }

  getTxid() {
    return this.getHash(true);
  }

  getScripts(options: ScriptInitOptions) {
    const scripts = [];
    for (const output of this.outputs) {
      const script = Script.fromBuffer(output.scriptBuffer, options);
      scripts.push(script);
    }
    return scripts;
  }

  getOpReturns(options = { singleOpReturn: false }) {
    const opreturns: [number, Buffer[][]][] = [];
    let index = 0;
    const scripts = this.getScripts({ opreturn: true });
    for (const script of scripts) {
      if (script) {
        opreturns.push([index, script.getOpReturn()]);
        if (options.singleOpReturn) break;
      }
      index++;
    }
    return opreturns;
  }

  parseBitcoms(options = { singleOpReturn: false }) {
    const bitcoms = [];
    const scripts = this.getScripts({ opreturn: true });
    for (const script of scripts) {
      if (script) {
        for (const bitcom of script.parseBitcoms()) {
          bitcoms.push(bitcom);
        }
        if (options.singleOpReturn) break;
      }
    }
    return bitcoms;
  }

  getBitcoms(options?: ScriptGetBitcoms) {
    const bitcoms = new Set();
    const scripts = this.getScripts({ opreturn: true });
    for (const script of scripts) {
      if (script) {
        script.getBitcoms(options).forEach((bitcom) => bitcoms.add(bitcom));
      }
    }
    return bitcoms;
  }

  getCoinbaseHeight() {
    // https://en.bitcoin.it/wiki/BIP_0034
    const br = new BufferReader(this.inputs[0].scriptBuffer);
    const buf = br.readVarLengthBuffer();
    return buf.readIntLE(0, buf.length);
  }
}
