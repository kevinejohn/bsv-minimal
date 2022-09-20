export function bigIntToNum(num: bigint | number) {
  num = Number(num);
  if (!(num <= Math.pow(2, 53))) {
    throw new Error("number too large to retain precision");
  }
  return num;
}
