import { Block, Header, Transaction, Script, utils } from "../src";
import fs from "fs";
import path from "path";
import assert from "assert";
const pako = require("pako");

const { Base58, BufferReader, BufferWriter } = utils;

(async () => {
  const blockHex = fs.readFileSync(path.join(__dirname, "./block.dat"), "utf8");
  const blockBuf = Buffer.from(blockHex, "hex");
  let block = Block.fromBuffer(blockBuf);
  block = Block.fromHex(blockHex);

  assert.equal(block.toHex(), blockHex);
  // console.log(block)
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
  const headerBuf = header.toBuffer();
  const header2 = Header.fromBuffer(headerBuf);
  assert.equal(
    header.getHash().toString("hex"),
    header2.getHash().toString("hex")
  );

  const tx1 = block.getTransactions()[0];
  const bufTx1 = tx1.toBuffer();
  const tx2 = Transaction.fromBuffer(bufTx1);
  const bufTx2 = tx2.toBuffer();
  assert.equal(Buffer.compare(bufTx1, bufTx2), 0);

  const blockBuf2 = block.toBuffer();
  const block2 = Block.fromBuffer(blockBuf2);
  assert.equal(
    block.getHash().toString("hex"),
    block2.getHash().toString("hex")
  );
  // console.log(block)
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
  assert(
    Buffer.compare(
      Buffer.from(
        "70932f8bf487093ae0c8cd4f1d96d09d3fcdbd62d7928adb284cf32ddff17c08",
        "hex"
      ),
      block.getTransactions()[0].getHash()
    ) === 0
  );

  let count = 0;
  await block.getTransactionsAsync((response) => {
    const { transactions } = response;
    // console.log(response)
    count += transactions.length;
  });
  assert.equal(count, 26);

  block = Block.fromBuffer(blockBuf);
  count = 0;
  await block.getTransactionsAsync((response) => {
    const { transactions } = response;
    // console.log(response)
    count += transactions.length;
  });
  assert.equal(count, 26);

  const block6 = Block.fromBuffer(blockBuf);
  console.log("TX COUNT", block6.txCount, block6.toBuffer().length);
  const blockChunks: Buffer[] = [];
  const skip = Number(blockBuf.length / 95);
  let i;
  for (i = 0; i < blockBuf.length; i += skip) {
    blockChunks.push(blockBuf.subarray(i, i + skip));
  }
  blockChunks.push(Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]));
  // blockChunks.push(blockBuf.slice(i))
  console.log(
    `Block is split into ${blockChunks.length} chunks at ${blockChunks[0].length} each. Total bytes ${blockBuf.length}`,
    blockChunks.reduce((prev, chunk) => prev + chunk.length, 0)
  );
  const block4 = new Block({ validate: true });
  for (const chunk of blockChunks) {
    const result = block4.addBufferChunk(chunk);
    const { transactions, finished, height } = result;
    // console.log(result)
    // if (finished) {
    //   block4.validate()
    //   block4.validate()
    // }
    for (const [index, tx, pos, len] of transactions) {
      // console.log(`tx ${index} ${tx.getHash().toString("hex")}, ${pos} ${len}`);
    }
    if (transactions.length > 0) assert.equal(height, 587603);
  }

  const block7 = new Block({ validate: true });
  block7.addBufferChunk(blockBuf);

  const block8 = Block.fromBuffer(blockBuf);
  block8.options = { validate: true };
  await block8.getTransactionsAsync(({ transactions }) => {
    for (const [index, tx, pos, len] of transactions) {
      const opreturns = tx.getOpReturns({ singleOpReturn: true });
      for (const [indexBitcom, [opreturn]] of opreturns) {
        const [bitcom, ...other] = opreturn;
        // console.log(index, indexBitcom, bitcom.toString(), other)
      }
    }
  });

  const tx3 = block.getTransactions()[1];
  for (const input of tx3.inputs) {
    const script = Script.fromBuffer(input.scriptBuffer);
    // console.log(script)
    if (script.toAddress()) {
      // console.log(script.toAddress())
      assert.equal(script.toAddress(), "1GBdAgTiqaLEXaPux1xRGxPA4TF5qSLRRF");
      break;
    }
  }
  for (const output of tx3.outputs) {
    const script = Script.fromBuffer(output.scriptBuffer);
    // console.log(script)
    if (script.toAddress()) {
      // console.log(script.toAddress())
      assert.equal(script.toAddress(), "1GBdAgTiqaLEXaPux1xRGxPA4TF5qSLRRF");
      break;
    }
  }

  // Test Base58
  let one = "1LtyME6b5AnMopQrBPLk4FGN8UBuhxKqrn";
  let two = Base58.decode(one);
  // console.log(one, Base58.encode(two))
  assert.equal(one, Base58.encode(two));

  console.log(tx3.getBitcoms());

  console.log(tx3.parseBitcoms());
  // block7.validate()
  // block7.validate()
  // const txids = block7.getTransactions().map(t => t.getHash())
  // block7.validate(txids)
  // block7.validate(txids)

  // assert.throws(
  //   () => {
  //     const block = new Block({ validate: true })
  //     block.addBufferChunk(blockBuf)
  //     block.getTransactions()
  //     block.transactions[0][0] += 1 // Change a txid
  //     block7.validate(txids)
  //   },
  //   {
  //     name: 'Error',
  //     message: 'Invalid merkle root'
  //   }
  // )

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

  assert.equal(block.getTransactions()[0].getCoinbaseHeight(), 587603);
  assert.equal(block.getHeight(), 587603);

  const blockHexV1 = fs.readFileSync(
    path.join(__dirname, "./blockv1.dat"),
    "utf8"
  );
  const blockV1 = Block.fromBuffer(Buffer.from(blockHexV1, "hex"));
  assert.throws(() => blockV1.getHeight(), {
    name: "Error",
    message: "No height in v1 blocks",
  });

  // Test bitcoms
  let hex1 = fs.readFileSync(
    path.join(
      __dirname,
      `c3994c4a7c10a8c9e758b4575b635463189ba3875d6a608fa5d04593f4346f54.hex`
    )
  );
  let tx10 = Transaction.fromBuffer(Buffer.from(hex1.toString(), "hex"));
  tx10 = Transaction.fromHex(hex1.toString());

  assert.equal(tx10.segwitFlag, undefined);
  assert.equal(tx10.segwitItems, undefined);

  assert.equal(tx10.toHex(), hex1.toString());
  // console.log(Array.from(tx10.getBitcoms()));
  assert.equal(
    JSON.stringify(Array.from(tx10.getBitcoms())),
    JSON.stringify([
      "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut",
      "1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5",
      "15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva",
    ])
  );
  // console.log(tx10.parseBitcoms()[1]["1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5"]);
  assert.equal(
    tx10.parseBitcoms()[1]["1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5"]?.map.sha256,
    "20f983758b7d3bd14b588a5f1f34320fbe96501a202f1daf4d3cc9c4d762a778"
  );
  let file = Buffer.from(
    pako.inflate(
      tx10.parseBitcoms()[0]["19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut"]?.data
    )
  );
  // console.log(file.toString());

  console.log(`Testing segwit tx`);
  let segwit_tx_hex =
    "020000000001010b89de912e2215abf1624f5bf29c1566af4f2c3bfb41b021ec118b7abed051cf0100000000ffffffff0272950600000000001600148befb48e0b89b5ff596a913b1efff9d4a7c677b2f7ce020000000000160014aa9793d406bd705d5339eab5604cd4189bcd956802483045022100b011828016a1463c840298c03e128ed5f43b65f697a4f0109090876520394d2602204edceb87dfa6e771ef9524105bce6f3a1c343fd08a50d531dc236f4ae6b9e67701210343834ba7e72dfdb41499c7b2fa472d981868b7a87d85471c4df8ffd07bd8c9b200000000";
  let segwit_tx = Transaction.fromHex(segwit_tx_hex);
  assert.equal(segwit_tx.inputs.length, 1);
  assert.equal(segwit_tx.sizeTxIns, 1);
  assert.equal(segwit_tx.outputs.length, 2);
  assert.equal(segwit_tx.sizeTxOuts, 2);
  assert.equal(segwit_tx.segwitFlag, 1);
  assert.equal(segwit_tx.segwitItems, 2);
  assert.equal(
    segwit_tx.getTxid(),
    "0479d03a6ce39c6c2e0e77f519708c49b4304336eb4f9313901bd292fbd69828"
  );
  assert.equal(
    segwit_tx.getWTxid(),
    "0246f1fe44e20479c28a4024b4c4b4765e56ea66eec92e1d4b2379551b48bb50"
  );
  assert(
    Buffer.compare(
      segwit_tx.getHash(),
      Buffer.from(
        "0246f1fe44e20479c28a4024b4c4b4765e56ea66eec92e1d4b2379551b48bb50",
        "hex"
      )
    ) === 0
  );

  // console.log(segwit_tx, segwit_tx.inputs[0]);

  console.log("Passed tests");
})();
