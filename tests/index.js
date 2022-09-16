const {
  Block,
  Header,
  Transaction,
  BlockLite,
  Script,
  utils: { Base58, BufferReader, BufferWriter },
} = require("../src");
const fs = require("fs");
const path = require("path");
const assert = require("assert");

(async () => {
  const blockHex = fs.readFileSync(path.join(__dirname, "./block.dat"), "utf8");
  const blockBuf = Buffer.from(blockHex, "hex");
  let block = Block.fromBuffer(blockBuf);
  // console.log(block)
  assert.equal(block.size, 8656);
  assert.equal(block.txCount, 26);

  assert.equal(
    block.getHash().toString("hex"),
    "0000000000000000065f5cd65ab43226317d3b1966eb9bf057467d156d34782f"
  );
  assert.equal(
    block.header.prevHash.toString("hex"),
    "00000000000000000280aa1a8ba060e60ea5bb55a9e8613a1d9623073868c738"
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

  const blockLite = block.toBlockLite();
  const blockLiteBuf = blockLite.toBuffer();
  const blockLite2 = BlockLite.fromBuffer(blockLiteBuf);
  for (let i = 0; i < block.getTransactions().length; i++) {
    assert.equal(
      Buffer.compare(blockLite2.txids[i], block.getTransactions()[i].getHash()),
      0
    );
  }
  const blockLite3 = BlockLite.fromBlockBuffer(blockBuf);
  for (let i = 0; i < block.getTransactions().length; i++) {
    assert.equal(
      Buffer.compare(blockLite3.txids[i], block.getTransactions()[i].getHash()),
      0
    );
  }

  const block3 = Block.fromBlockLite(blockLite2, block.getTransactions());
  assert.equal(Buffer.compare(block3.toBuffer(), block.toBuffer()), 0);

  assert.throws(
    () => {
      Block.fromBlockLite(blockLite2, block.getTransactions().slice(1, -1));
    },
    {
      name: "Error",
      message: "Invalid transactions",
    }
  );

  assert.equal(
    block.getTransactions()[0].getHash().toString("hex"),
    "70932f8bf487093ae0c8cd4f1d96d09d3fcdbd62d7928adb284cf32ddff17c08"
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
  const blockChunks = [];
  const skip = parseInt(blockBuf.length / 220);
  let i;
  for (i = 0; i < blockBuf.length; i += skip) {
    blockChunks.push(blockBuf.slice(i, i + skip));
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
    const { transactions, finished, remaining, height } = result;
    // console.log(result)
    // if (finished) {
    //   block4.validate()
    //   block4.validate()
    // }
    if (transactions.length > 0) assert.equal(height, 587603);
  }

  const block7 = new Block({ validate: true });
  block7.addBufferChunk(blockBuf);

  const block8 = Block.fromBuffer(blockBuf);
  block8.options = { validate: true };
  await block8.getTransactionsAsync((response) => {
    const { transactions } = response;
    for (const [index, tx] of transactions) {
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
  console.log("Passed tests");
})();
