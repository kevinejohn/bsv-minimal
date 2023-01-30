import { BufferReader, Opcode, Hash, Base58 } from "./utils";

const NETWORK_BUF = {
  testnet: Buffer.from([0x6f]),
  mainnet: Buffer.from([0x00]),
};

export interface ScriptInitOptions {
  opreturn?: boolean;
}

export interface ScriptChunk {
  opcodenum: number;
  len?: number;
  buf?: Buffer;
}

export interface ScriptGetBitcoms {
  maxBitcomLen: number;
}

export type ScriptBitcom = {
  bitcom: string;
  data: Buffer[];
  "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut"?: {
    data: Buffer;
    type: string;
    encoding: string;
    name: string;
  };
  "1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5"?: {
    type: string;
    map: { [key: string]: string };
  };
};

export default class Script {
  chunks: ScriptChunk[];
  buffer: Buffer;

  private constructor(br: BufferReader, chunks: ScriptChunk[]) {
    this.chunks = chunks;
    this.buffer = br.buf;

    while (!br.finished()) {
      try {
        const opcodenum = br.readUInt8();

        let len, buf;
        if (opcodenum > 0 && opcodenum < Opcode.OP_PUSHDATA1) {
          len = opcodenum;
          this.chunks.push({
            buf: br.read(len),
            len: len,
            opcodenum: opcodenum,
          });
        } else if (opcodenum === Opcode.OP_PUSHDATA1) {
          len = br.readUInt8();
          buf = br.read(len);
          this.chunks.push({
            buf: buf,
            len: len,
            opcodenum: opcodenum,
          });
        } else if (opcodenum === Opcode.OP_PUSHDATA2) {
          len = br.readUInt16LE();
          buf = br.read(len);
          this.chunks.push({
            buf: buf,
            len: len,
            opcodenum: opcodenum,
          });
        } else if (opcodenum === Opcode.OP_PUSHDATA4) {
          len = br.readUInt32LE();
          buf = br.read(len);
          this.chunks.push({
            buf: buf,
            len: len,
            opcodenum: opcodenum,
          });
        } else {
          this.chunks.push({
            opcodenum: opcodenum,
          });
        }
      } catch (err) {
        if (err instanceof RangeError) {
          throw new Error(`Invalid script`);
        }
        throw err;
      }
    }
  }

  static fromBuffer(buf: Buffer, options: ScriptInitOptions = {}) {
    const br = new BufferReader(buf);
    return this.fromBufferReader(br, options);
  }

  static fromBufferReader(
    br: BufferReader,
    options: ScriptInitOptions = { opreturn: false }
  ) {
    if (br.eof()) throw Error("Invalid script");
    const chunks: ScriptChunk[] = [];
    if (options.opreturn) {
      let opcodenum = br.readUInt8();
      if (opcodenum === Opcode.OP_FALSE) {
        chunks.push({ opcodenum });
        if (!br.eof()) opcodenum = br.readUInt8();
      }
      if (opcodenum !== Opcode.OP_RETURN) {
        throw Error("No OP_RETURN");
      }
      chunks.push({ opcodenum });
    }
    const script = new Script(br, chunks);
    return script;
  }

  static fromHex(hex: string) {
    const buf = Buffer.from(hex, "hex");
    return Script.fromBuffer(buf);
  }

  getOpReturn() {
    const chunks = [...this.chunks];
    const opreturn: Buffer[][] = [];
    let chunk = chunks.shift();
    if (chunk?.opcodenum === Opcode.OP_FALSE) {
      chunk = chunks.shift();
    }
    while (chunks.length > 0) {
      const bufs: Buffer[] = [];
      while (chunks.length > 0) {
        chunk = chunks.shift();
        if (
          chunk?.buf &&
          chunk.buf.length === 1 &&
          chunk.buf.toString() === "|"
        ) {
          break;
        } else if (chunk?.buf) {
          bufs.push(chunk.buf);
        } else {
          bufs.push(Buffer.from(""));
        }
      }
      opreturn.push(bufs);
    }
    return opreturn;
  }

  parseBitcoms(): ScriptBitcom[] {
    const opreturn = this.getOpReturn();
    const results: ScriptBitcom[] = [];
    for (const cell of opreturn) {
      const bitcom = cell[0].toString();
      const obj: ScriptBitcom = { bitcom, data: cell.slice(1) };
      if (bitcom === "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut") {
        const [, data, type, encoding, name] = cell;
        obj["19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut"] = {
          data,
          type: type ? type.toString() : "",
          encoding: encoding ? encoding.toString() : "",
          name: name ? name.toString() : "",
        };
      } else if (bitcom === "1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5") {
        const type = cell[1] ? cell[1].toString() : "";
        const map: Record<string, string> = {};
        for (let i = 2; i < cell.length; i += 2) {
          const key = cell[i].toString();
          const value = cell[i + 1] ? cell[i + 1].toString() : "";
          map[key] = value;
        }
        obj["1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5"] = { type, map };
      }
      results.push(obj);
    }
    return results;
  }

  getBitcoms(options: ScriptGetBitcoms = { maxBitcomLen: 50 }): Set<string> {
    const bitcoms: Set<string> = new Set();
    const opreturn = this.getOpReturn();
    for (const [bitcom] of opreturn) {
      if (
        bitcom &&
        bitcom.length > 0 &&
        bitcom.length <= options.maxBitcomLen
      ) {
        bitcoms.add(bitcom.toString());
      }
    }
    return bitcoms;
  }

  toBuffer() {
    return this.buffer;
  }

  toHex() {
    return this.toBuffer().toString("hex");
  }

  toAddressBuf() {
    if (
      // Output
      this.chunks &&
      this.chunks.length === 5 &&
      this.chunks[0].opcodenum === Opcode.OP_DUP &&
      this.chunks[1].opcodenum === Opcode.OP_HASH160 &&
      this.chunks[2].buf &&
      this.chunks[2].buf.length === 20 &&
      this.chunks[3].opcodenum === Opcode.OP_EQUALVERIFY &&
      this.chunks[4].opcodenum === Opcode.OP_CHECKSIG
    ) {
      return this.chunks[2].buf;
    } else if (
      // Input
      this.chunks &&
      this.chunks.length === 2 &&
      this.chunks[1].buf &&
      this.chunks[1].buf.length === 33
    ) {
      return Hash.sha256ripemd160(this.chunks[1].buf);
    }
  }

  toAddress(network: keyof typeof NETWORK_BUF = "mainnet") {
    const addressBuf = this.toAddressBuf();
    if (addressBuf) {
      let buf = Buffer.concat([NETWORK_BUF[network], addressBuf]);
      const check = Hash.sha256sha256(buf).slice(0, 4);
      buf = Buffer.concat([buf, check]);
      return Base58.encode(buf);
    }
  }
}
