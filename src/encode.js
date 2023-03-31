const LOWER_ALPHABETS = '0123456789abcdef';
const HIGHER_ALPHABETS = 'ghjkmnpqrstvwxyz';

/**
 * Given an unsigned integer of `Number` or `BigInt` type, return Azam Codec encoded string,
 * or undefined if `num` is undefined or not an unsigned integer.
 *
 * @param {number|BigInt} num Number or BigInt value
 * @returns {string|undefined} Azam codec encoded string
 */
const encodeInt = (num) => {
  if (num == undefined || num == null) return undefined;
  let value = '';
  if (typeof num == 'bigint') {
    if (num < 0n) return undefined;
    let lowNybbleWritten = false;
    for (;;) {
      const nybbleValue = Number(num & 0xfn);
      const nybbleChar = (lowNybbleWritten ? HIGHER_ALPHABETS : LOWER_ALPHABETS)[nybbleValue];
      if (!lowNybbleWritten) lowNybbleWritten = true;
      value = nybbleChar + value;
      num = num >> 4n;
      if (num === 0n) break;
    }
  } else {
    if (num < 0 || !Number.isInteger(num)) return undefined;
    let lowNybbleWritten = false;
    for (;;) {
      const nybbleValue = num % 16;
      const nybbleChar = (lowNybbleWritten ? HIGHER_ALPHABETS : LOWER_ALPHABETS)[nybbleValue];
      if (!lowNybbleWritten) lowNybbleWritten = true;
      value = nybbleChar + value;
      num = (num - nybbleValue) / 16;
      if (num === 0) break;
    }
  }
  return value;
};

/**
 * Given an unsigned integer of `Number` or `BigInt` typed array, return Azam Codec encoded string,
 * or undefined if `nums` is undefined, or any element in `nums` is undefined or not an unsigned integer.
 *
 * @param  {...Number|BigInt} nums
 * @returns Azam Codec encoded string
 */
const encodeInts = (...nums) => {
  if (nums == undefined || nums == null) return undefined;
  let values = '';
  for (let num of nums) {
    const value = encodeInt(num);
    if (value == undefined) return undefined;
    values += value;
  }
  return values;
};

export { encodeInt, encodeInts };
