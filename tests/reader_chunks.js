const {
  utils: { BufferChunksReader },
} = require("../src");
const assert = require("assert");

(async () => {
  const SIZE = 256;
  let origBuf = Buffer.alloc(SIZE);
  let buf;

  const CHUNK_SIZE = 10;

  for (let i = 0; i < origBuf.length; i++) {
    origBuf[i] = i;
  }

  let br = new BufferChunksReader();

  for (let i = 0; i < origBuf.length; i += CHUNK_SIZE) {
    const chunk = origBuf.slice(i, i + CHUNK_SIZE);
    br.append(chunk);
  }
  console.log(br.pos, br.bufIndex, br.bufPos, br.length);
  assert(br.pos === 0);
  assert(br.bufIndex === 0);
  assert(br.bufPos === 0);
  br.read(11);
  console.log(br.pos, br.bufIndex, br.bufPos, br.length);
  assert(br.pos === 11);
  assert(br.bufIndex === 1);
  assert(br.bufPos === 1);
  br.rewind(3);
  console.log(br.pos, br.bufIndex, br.bufPos, br.length);
  assert(br.pos === 8);
  assert(br.bufIndex === 0);
  assert(br.bufPos === 8);

  br.read(111);
  console.log(br.pos, br.bufIndex, br.bufPos, br.length);
  assert(br.pos === 119);
  assert(br.bufIndex === 11);
  assert(br.bufPos === 9);
  br.rewind(100);
  console.log(br.pos, br.bufIndex, br.bufPos, br.length);
  assert(br.pos === 19);
  assert(br.bufIndex === 1);
  assert(br.bufPos === 9);

  assert(Buffer.compare(br.slice(50, 55), origBuf.slice(50, 55)) === 0);

  assert(br.pos === 19);
  assert(br.bufIndex === 1);
  assert(br.bufPos === 9);

  assert(Buffer.compare(br.slice(50, 55), origBuf.slice(50, 55)) === 0);

  assert(Buffer.compare(br.slice(5, 155), origBuf.slice(5, 155)) === 0);

  assert(br.pos === 19);
  assert(br.bufIndex === 1);
  assert(br.bufPos === 9);
})();
