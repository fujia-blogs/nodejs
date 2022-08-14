function toNum(val) {
  return val >> 0;
}

function toNum2(val) {
  return val >>> 0;
}

console.log(toNum(Number.MAX_SAFE_INTEGER));
console.log(toNum2(Number.MAX_SAFE_INTEGER));

const val = Number.MAX_SAFE_INTEGER.toString(2);
console.log(val);

const val1 = val.substring(0, 32);
console.log(parseInt(val1, 2));
