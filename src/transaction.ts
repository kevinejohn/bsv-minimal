import Script, {
  ScriptGetBitcoms,
  ScriptInitOptions,
  ScriptBitcom,
} from "./script";
import { BufferReader, BufferChunksReader, Hash } from "./utils";

export interface TransactionInput {
  vin: number;
  scriptBuffer: Buffer;
  prevTxId: Buffer;
  vout: number;
  sequenceNumber: number;
}

export interface TransactionOutput {
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
  length: number;

  private constructor(br: BufferReader | BufferChunksReader) {
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
    this.length = buffer.length;
  }

  static fromBuffer(buf: Buffer) {
    const br = new BufferReader(buf);
    return this.fromBufferReader(br);
  }

  static fromBufferReader(br: BufferReader | BufferChunksReader) {
    const transaction = new Transaction(br);
    return transaction;
  }

  toBuffer() {
    return this.buffer;
  }

  getHash(): Buffer {
    if (!this.hash) {
      const buf = this.toBuffer();
      this.hash = Hash.sha256sha256(buf).reverse();
    }
    return this.hash;
  }

  getTxid() {
    return this.getHash().toString("hex");
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
