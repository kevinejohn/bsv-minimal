import { Block, Header, Transaction, Script, utils } from "../src";
import fs from "fs";
import path from "path";
import assert from "assert";
import { OutOfBoundsError } from "../src/utils/errors";
const pako = require("pako");

const { Base58, BufferReader, BufferWriter } = utils;

type Fixtures = {
  blockHex: string;
  blockBuf: Buffer;
  blockV1Hex: string;
  bitcomHex: string;
};

type TestFn = () => Promise<void> | void;

async function runTest(name: string, fn: TestFn) {
  try {
    await fn();
  } catch (err) {
    const detail = err instanceof Error ? err.stack || err.message : String(err);
    throw new Error(`Test failed: ${name}\n${detail}`);
  }
}

function readFixture(name: string) {
  return fs.readFileSync(path.join(__dirname, name), "utf8");
}

function loadFixtures(): Fixtures {
  const blockHex = readFixture("./block.dat");
  return {
    blockHex,
    blockBuf: Buffer.from(blockHex, "hex"),
    blockV1Hex: readFixture("./blockv1.dat"),
    bitcomHex: readFixture(
      "./c3994c4a7c10a8c9e758b4575b635463189ba3875d6a608fa5d04593f4346f54.hex"
    ),
  };
}

function corruptMerkleBlockBuf(blockBuf: Buffer) {
  const corruptBlockBuf = Buffer.from(blockBuf);
  corruptBlockBuf[120] ^= 0x01;
  return corruptBlockBuf;
}

function buildCoinbaseTx(scriptBuffer: Buffer) {
  return Transaction.fromBuffer(
    Buffer.concat([
      Buffer.from("0100000001", "hex"),
      Buffer.alloc(32),
      Buffer.from("ffffffff", "hex"),
      Buffer.from([scriptBuffer.length]),
      scriptBuffer,
      Buffer.from("ffffffff00", "hex"),
      Buffer.from("00000000", "hex"),
    ])
  );
}

function buildInputScript(pubKey: Buffer) {
  const signature = Buffer.alloc(72, 0x01);
  return Script.fromBuffer(
    Buffer.concat([
      Buffer.from([signature.length]),
      signature,
      Buffer.from([pubKey.length]),
      pubKey,
    ])
  );
}

function findAddress(scriptBuffers: Buffer[]) {
  for (const scriptBuffer of scriptBuffers) {
    const address = Script.fromBuffer(scriptBuffer).toAddress();
    if (address) return address;
  }
}

function testBlockParsing({ blockHex, blockBuf }: Fixtures) {
  let block = Block.fromBuffer(blockBuf);
  block = Block.fromHex(blockHex);

  assert.equal(block.toHex(), blockHex);
  assert.equal(block.size, 8656);
  assert.equal(block.txCount, 26);
  assert.equal(
    block.getHash().toString("hex"),
    "0000000000000000065f5cd65ab43226317d3b1966eb9bf057467d156d34782f"
  );
  assert.equal(
    block.header?.prevHash.toString("hex"),
    "00000000000000000280aa1a8ba060e60ea5bb55a9e8613a1d9623073868c738"
  );
  assert.equal(
    block.getHash(true),
    "0000000000000000065f5cd65ab43226317d3b1966eb9bf057467d156d34782f"
  );
  assert(
    Buffer.compare(
      Buffer.from(
        "0000000000000000065f5cd65ab43226317d3b1966eb9bf057467d156d34782f",
        "hex"
      ),
      block.getHash()
    ) === 0
  );
  assert.equal(block.transactions, undefined);
  assert.equal(block.getTransactions().length, 26);

  const header = Header.fromBuffer(blockBuf);
  const header2 = Header.fromBuffer(header.toBuffer());
  assert.equal(
    header.getHash().toString("hex"),
    header2.getHash().toString("hex")
  );

  const tx1 = block.getTransactions()[0];
  const tx2 = Transaction.fromBuffer(tx1.toBuffer());
  assert.equal(Buffer.compare(tx1.toBuffer(), tx2.toBuffer()), 0);

  const block2 = Block.fromBuffer(block.toBuffer());
  assert.equal(
    block.getHash().toString("hex"),
    block2.getHash().toString("hex")
  );
  assert.equal(block.getTransactions().length, block2.getTransactions().length);
  assert.equal(block.size, block2.size);
  assert.equal(Buffer.compare(block.toBuffer(), block2.toBuffer()), 0);

  assert.equal(
    block.getTransactions()[0].getHash().toString("hex"),
    "70932f8bf487093ae0c8cd4f1d96d09d3fcdbd62d7928adb284cf32ddff17c08"
  );
  assert.equal(
    block.getTransactions()[0].getTxid(),
    "70932f8bf487093ae0c8cd4f1d96d09d3fcdbd62d7928adb284cf32ddff17c08"
  );
}

async function testAsyncTransactions({ blockBuf }: Fixtures) {
  let block = Block.fromBuffer(blockBuf);
  let count = 0;
  await block.getTransactionsAsync(({ size, txs }) => {
    assert.equal(size, blockBuf.length);
    for (const { tx, size: txSize } of txs) {
      assert.equal(txSize, tx.length);
    }
    count += txs.length;
  });
  assert.equal(count, 26);

  block = Block.fromBuffer(blockBuf);
  count = 0;
  await block.getTransactionsAsync(({ txs }) => {
    count += txs.length;
  });
  assert.equal(count, 26);
}

function testChunkedBlockParsing({ blockBuf }: Fixtures) {
  const blockChunks: Buffer[] = [];
  const chunkSize = Math.floor(blockBuf.length / 95);
  for (let i = 0; i < blockBuf.length; i += chunkSize) {
    blockChunks.push(blockBuf.subarray(i, i + chunkSize));
  }
  blockChunks.push(Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]));

  const block = new Block({ validate: true });
  let txCount = 0;
  let lastResult;
  for (const chunk of blockChunks) {
    lastResult = block.addBufferChunk(chunk);
    txCount += lastResult.txs.length;
    if (lastResult.txs.length > 0) assert.equal(lastResult.height, 587603);
  }

  assert.equal(txCount, 26);
  assert.equal(lastResult?.finished, true);
  assert.equal(lastResult?.txRead, 26);

  const fullBlock = new Block({ validate: true });
  const result = fullBlock.addBufferChunk(blockBuf);
  assert.equal(result.finished, true);
  assert.equal(result.txs.length, 26);

  const parsedBlock = Block.fromBuffer(blockBuf);
  assert(parsedBlock.txPos);
  const partialTxEnd = parsedBlock.txPos + 10;
  const pausedBlock = new Block({ validate: true });
  const paused = pausedBlock.addBufferChunk(blockBuf.subarray(0, partialTxEnd));
  assert.equal(paused.started, true);
  assert.equal(paused.finished, false);
  assert.equal(paused.txs.length, 0);
  assert.equal(paused.txRead, 0);

  const resumed = pausedBlock.addBufferChunk(blockBuf.subarray(partialTxEnd));
  assert.equal(resumed.finished, true);
  assert.equal(resumed.txs.length, 26);
  assert.equal(resumed.txRead, 26);
}

async function testMerkleValidationRejectsCorruption({ blockBuf }: Fixtures) {
  assert.throws(
    () => {
      const corruptBlock = new Block({ validate: true });
      corruptBlock.addBufferChunk(corruptMerkleBlockBuf(blockBuf));
    },
    {
      name: "Error",
      message: "Invalid merkle root!",
    }
  );

  const corruptAsyncBlock = Block.fromBuffer(corruptMerkleBlockBuf(blockBuf));
  corruptAsyncBlock.options = { validate: true };
  await assert.rejects(corruptAsyncBlock.getTransactionsAsync(() => {}), {
    name: "Error",
    message: "Invalid merkle root!",
  });
}

async function testOpReturnScanning({ blockBuf }: Fixtures) {
  const block = Block.fromBuffer(blockBuf);
  block.options = { validate: true };
  let txCount = 0;
  await block.getTransactionsAsync(({ txs }) => {
    for (const { tx } of txs) {
      tx.getOpReturns({ singleOpReturn: true });
      txCount++;
    }
  });
  assert.equal(txCount, 26);
}

function testScriptAddresses({ blockBuf }: Fixtures) {
  const block = Block.fromBuffer(blockBuf);
  const tx = block.getTransactions()[1];

  assert.equal(
    findAddress(tx.inputs.map((input) => input.scriptBuffer)),
    "1GBdAgTiqaLEXaPux1xRGxPA4TF5qSLRRF"
  );
  assert.equal(
    findAddress(tx.outputs.map((output) => output.scriptBuffer)),
    "1GBdAgTiqaLEXaPux1xRGxPA4TF5qSLRRF"
  );

  const uncompressedPubKey = Buffer.concat([
    Buffer.from([0x04]),
    Buffer.alloc(64, 0x03),
  ]);
  assert.equal(
    buildInputScript(uncompressedPubKey).toAddress(),
    "1FMLTqn4dPH24BtyhoXtWWDC9K6dSnSU67"
  );

  const invalidCompressedPubKey = Buffer.concat([
    Buffer.from([0x05]),
    Buffer.alloc(32, 0x02),
  ]);
  const invalidUncompressedPubKey = Buffer.concat([
    Buffer.from([0x05]),
    Buffer.alloc(64, 0x03),
  ]);
  assert.equal(
    buildInputScript(invalidCompressedPubKey).toAddress(),
    undefined
  );
  assert.equal(
    buildInputScript(invalidUncompressedPubKey).toAddress(),
    undefined
  );
}

function testScriptBoundsChecking() {
  const truncatedPushes = [
    Buffer.from([0x02, 0x01]),
    Buffer.from([0x4c, 0x0a, 0x01]),
    Buffer.from([0x4d, 0x02, 0x00, 0x01]),
    Buffer.from([0x4e, 0x02, 0x00, 0x00, 0x00, 0x01]),
  ];

  for (const scriptBuffer of truncatedPushes) {
    assert.throws(() => Script.fromBuffer(scriptBuffer), OutOfBoundsError);
  }
}

function testBase58() {
  const address = "1LtyME6b5AnMopQrBPLk4FGN8UBuhxKqrn";
  assert.equal(address, Base58.encode(Base58.decode(address)));
  assert.throws(() => Base58.decode("\ud83d\ude00"), {
    name: "Error",
    message: "Invalid character",
  });
  assert.throws(() => Base58.decode("\u0100"), {
    name: "Error",
    message: "Invalid character",
  });
  assert.throws(() => Base58.decode("\ud800"), {
    name: "Error",
    message: "Invalid character",
  });
  assert.throws(() => Base58.decode("0"), {
    name: "Error",
    message: "Invalid character",
  });
}

function testBufferReaderWriter() {
  const varintCases: [number, string][] = [
    [252, "fc"],
    [253, "fdfd00"],
    [65535, "fdffff"],
    [65536, "fe00000100"],
    [0xffffffff, "feffffffff"],
    [0x100000000, "ff0000000001000000"],
  ];

  for (const [value, hex] of varintCases) {
    const encoded = BufferWriter.varintBufNum(value);
    assert.equal(encoded.toString("hex"), hex);
    const br = new BufferReader(encoded);
    assert.equal(br.readVarintNum(), value);
    assert.equal(br.finished(), true);
  }

  const bw = new BufferWriter();
  const b1 = Buffer.from("hello");
  const b2 = Buffer.from("world!!!");
  const b3 = Buffer.from("bye");
  bw.writeVarLengthBuffer(b1);
  bw.writeVarLengthBuffer(b2);
  bw.writeVarLengthBuffer(b3);

  const br = new BufferReader(bw.toBuffer());
  assert.equal(br.readVarLengthBuffer().toString(), b1.toString());
  assert.equal(br.readVarLengthBuffer().toString(), b2.toString());
  assert.equal(br.readVarLengthBuffer().toString(), b3.toString());

  const shortRead = new BufferReader(Buffer.from([0x03, 0x01]));
  assert.throws(() => shortRead.readVarLengthBuffer(), OutOfBoundsError);
  assert.equal(shortRead.pos, 0);

  const directShortRead = new BufferReader(Buffer.from([0x01]));
  assert.throws(() => directShortRead.read(2), OutOfBoundsError);
  assert.equal(directShortRead.pos, 0);

  const shortUInt64Read = new BufferReader(Buffer.from([0xff, 0x01]));
  assert.throws(() => shortUInt64Read.readVarintNum(), OutOfBoundsError);
  assert.equal(shortUInt64Read.pos, 0);

  const uint64HighBit = BigInt("9223372036854775808");
  const uint64Max = BigInt("18446744073709551615");

  const bw64 = new BufferWriter();
  bw64.writeUInt64BE(BigInt(0));
  bw64.writeUInt64LE(BigInt(0));
  bw64.writeUInt64BE(uint64HighBit);
  bw64.writeUInt64LE(uint64HighBit);
  bw64.writeUInt64BE(uint64Max);
  bw64.writeUInt64LE(uint64Max);
  assert.equal(
    bw64.toBuffer().toString("hex"),
    [
      "0000000000000000",
      "0000000000000000",
      "8000000000000000",
      "0000000000000080",
      "ffffffffffffffff",
      "ffffffffffffffff",
    ].join("")
  );

  assert.throws(
    () => new BufferWriter().writeUInt64BE(BigInt("-1")),
    RangeError
  );
  assert.throws(
    () => new BufferWriter().writeUInt64LE(BigInt("18446744073709551616")),
    RangeError
  );
}

function testCoinbaseHeight({ blockBuf, blockV1Hex }: Fixtures) {
  const block = Block.fromBuffer(blockBuf);
  assert.equal(block.getTransactions()[0].getCoinbaseHeight(), 587603);
  assert.equal(block.getHeight(), 587603);

  const lowHeightScript = Buffer.from([0x03, 0xac, 0xf2, 0x02]);
  assert.equal(buildCoinbaseTx(lowHeightScript).getCoinbaseHeight(), 193196);

  const blockV1 = Block.fromBuffer(Buffer.from(blockV1Hex, "hex"));
  assert.throws(() => blockV1.getHeight(), {
    name: "Error",
    message: "No height in v1 blocks",
  });
}

function testBitcoms({ bitcomHex }: Fixtures) {
  let tx = Transaction.fromBuffer(Buffer.from(bitcomHex, "hex"));
  tx = Transaction.fromHex(bitcomHex);

  assert.equal(tx.segwitFlag, undefined);
  assert.equal(tx.segwitItems, undefined);
  assert.equal(tx.toHex(), bitcomHex);
  assert.equal(
    JSON.stringify(Array.from(tx.getBitcoms())),
    JSON.stringify([
      "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut",
      "1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5",
      "15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva",
    ])
  );

  const parsedBitcoms = tx.parseBitcoms();
  const mapBitcom = parsedBitcoms[1]["1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5"];
  assert(mapBitcom);
  assert.equal(
    mapBitcom.map.sha256,
    "20f983758b7d3bd14b588a5f1f34320fbe96501a202f1daf4d3cc9c4d762a778"
  );

  const fileBitcom = parsedBitcoms[0]["19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut"];
  assert(fileBitcom);
  const file = Buffer.from(pako.inflate(fileBitcom.data));
  assert(file.length > 0);
}

function testSegwit() {
  const segwitTxHex =
    "020000000001010b89de912e2215abf1624f5bf29c1566af4f2c3bfb41b021ec118b7abed051cf0100000000ffffffff0272950600000000001600148befb48e0b89b5ff596a913b1efff9d4a7c677b2f7ce020000000000160014aa9793d406bd705d5339eab5604cd4189bcd956802483045022100b011828016a1463c840298c03e128ed5f43b65f697a4f0109090876520394d2602204edceb87dfa6e771ef9524105bce6f3a1c343fd08a50d531dc236f4ae6b9e67701210343834ba7e72dfdb41499c7b2fa472d981868b7a87d85471c4df8ffd07bd8c9b200000000";
  const segwitTx = Transaction.fromHex(segwitTxHex);
  assert.equal(segwitTx.inputs.length, 1);
  assert.equal(segwitTx.sizeTxIns, 1);
  assert.equal(segwitTx.outputs.length, 2);
  assert.equal(segwitTx.sizeTxOuts, 2);
  assert.equal(segwitTx.segwitFlag, 1);
  assert.equal(segwitTx.segwitItems, 2);
  assert.equal(
    segwitTx.getTxid(),
    "0479d03a6ce39c6c2e0e77f519708c49b4304336eb4f9313901bd292fbd69828"
  );
  assert.equal(
    segwitTx.getWTxid(),
    "0246f1fe44e20479c28a4024b4c4b4765e56ea66eec92e1d4b2379551b48bb50"
  );
  assert(
    Buffer.compare(
      segwitTx.getHash(),
      Buffer.from(
        "0479d03a6ce39c6c2e0e77f519708c49b4304336eb4f9313901bd292fbd69828",
        "hex"
      )
    ) === 0
  );

  const nonsegwitTxHex =
    "01000000000165000000000000001976a91488f910e4d0c523d8813416321274d217449533f888ac00000000";
  const nonsegwitTx = Transaction.fromHex(nonsegwitTxHex, {
    disableSegwit: true,
  });
  assert.equal(nonsegwitTx.inputs.length, 0);
  assert.equal(nonsegwitTx.sizeTxIns, 0);
  assert.equal(nonsegwitTx.outputs.length, 1);
  assert.equal(nonsegwitTx.sizeTxOuts, 1);
  assert.equal(nonsegwitTx.segwitFlag, undefined);
  assert.equal(nonsegwitTx.segwitItems, undefined);
}

(async () => {
  const fixtures = loadFixtures();
  await runTest("block parsing", () => testBlockParsing(fixtures));
  await runTest("async transactions", () => testAsyncTransactions(fixtures));
  await runTest("chunked block parsing", () => testChunkedBlockParsing(fixtures));
  await runTest("merkle validation rejects corruption", () =>
    testMerkleValidationRejectsCorruption(fixtures)
  );
  await runTest("op return scanning", () => testOpReturnScanning(fixtures));
  await runTest("script addresses", () => testScriptAddresses(fixtures));
  await runTest("script bounds checking", testScriptBoundsChecking);
  await runTest("base58", testBase58);
  await runTest("buffer reader writer", testBufferReaderWriter);
  await runTest("coinbase height", () => testCoinbaseHeight(fixtures));
  await runTest("bitcoms", () => testBitcoms(fixtures));
  await runTest("segwit", testSegwit);
})();
