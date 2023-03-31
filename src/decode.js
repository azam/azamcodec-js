/**
 * Given a character, returns the nybble value of 0x00..0x0f for lower nybble,
 * or 0x10..0x1f for higher nybble.
 *
 * @param {string} value
 * @returns Nybble value
 */
const nybbleValueString = (value) => {
  switch (value) {
    // Lower nybble
    case '0':
    case 'o':
    case 'O':
      return 0x00;
    case '1':
    case 'i':
    case 'I':
    case 'l':
    case 'L':
      return 0x01;
    case '2':
      return 0x02;
    case '3':
      return 0x03;
    case '4':
      return 0x04;
    case '5':
      return 0x05;
    case '6':
      return 0x06;
    case '7':
      return 0x07;
    case '8':
      return 0x08;
    case '9':
      return 0x09;
    case 'a':
    case 'A':
      return 0x0a;
    case 'b':
    case 'B':
      return 0x0b;
    case 'c':
    case 'C':
      return 0x0c;
    case 'd':
    case 'D':
      return 0x0d;
    case 'e':
    case 'E':
      return 0x0e;
    case 'f':
    case 'F':
      return 0x0f;
    // Higher nybble
    case 'g':
    case 'G':
      return 0x10;
    case 'h':
    case 'H':
      return 0x11;
    case 'j':
    case 'J':
      return 0x12;
    case 'k':
    case 'K':
      return 0x13;
    case 'm':
    case 'M':
      return 0x14;
    case 'n':
    case 'N':
      return 0x15;
    case 'p':
    case 'P':
      return 0x16;
    case 'q':
    case 'Q':
      return 0x17;
    case 'r':
    case 'R':
      return 0x18;
    case 's':
    case 'S':
      return 0x19;
    case 't':
    case 'T':
      return 0x1a;
    case 'v':
    case 'V':
      return 0x1b;
    case 'w':
    case 'W':
      return 0x1c;
    case 'x':
    case 'X':
      return 0x1d;
    case 'y':
    case 'Y':
      return 0x1e;
    case 'z':
    case 'Z':
      return 0x1f;
    default:
      return undefined;
  }
};

/**
 * Given am integer, returns the nybble value of 0x00..0x0f for lower nybble,
 * or 0x10..0x1f for higher nybble.
 *
 * @param {number} value
 * @returns Nybble value
 */
const nybbleValueNum = (value) => {
  switch (value) {
    // Lower nybble
    case 0x30: // '0'
    case 0x6f: // 'o'
    case 0x4f: // 'O'
      return 0x00;
    case 0x31: // '1'
    case 0x69: // 'i'
    case 0x49: // 'I'
    case 0x6c: // 'l'
    case 0x4c: // 'L'
      return 0x01;
    case 0x32: // '2'
      return 0x02;
    case 0x33: // '3'
      return 0x03;
    case 0x34: // '4'
      return 0x04;
    case 0x35: // '5'
      return 0x05;
    case 0x36: // '6'
      return 0x06;
    case 0x37: // '7'
      return 0x07;
    case 0x38: // '8'
      return 0x08;
    case 0x39: // '9'
      return 0x09;
    case 0x61: // 'a'
    case 0x41: // 'A'
      return 0x0a;
    case 0x62: // 'b'
    case 0x42: // 'B'
      return 0x0b;
    case 0x63: // 'c'
    case 0x43: // 'C'
      return 0x0c;
    case 0x64: // 'd'
    case 0x44: // 'D'
      return 0x0d;
    case 0x65: // 'e'
    case 0x45: // 'E'
      return 0x0e;
    case 0x66: // 'f'
    case 0x46: // 'F'
      return 0x0f;
    // Higher nybble
    case 0x67: // 'g'
    case 0x47: // 'g'
      return 0x10;
    case 0x68: // 'h'
    case 0x48: // 'H'
      return 0x11;
    case 0x6a: // 'j'
    case 0x4a: // 'J'
      return 0x12;
    case 0x6b: // 'k'
    case 0x4b: // 'K'
      return 0x13;
    case 0x6d: // 'm'
    case 0x4d: // 'M'
      return 0x14;
    case 0x6e: // 'n'
    case 0x4e: // 'N'
      return 0x15;
    case 0x70: // 'p'
    case 0x50: // 'P'
      return 0x16;
    case 0x71: // 'q'
    case 0x51: // 'Q'
      return 0x17;
    case 0x72: // 'r'
    case 0x52: // 'R'
      return 0x18;
    case 0x73: // 's'
    case 0x53: // 'S'
      return 0x19;
    case 0x74: // 't'
    case 0x54: // 'T'
      return 0x1a;
    case 0x76: // 'v'
    case 0x56: // 'V'
      return 0x1b;
    case 0x77: // 'W'
    case 0x57: // 'W'
      return 0x1c;
    case 0x78: // 'x'
    case 0x58: // 'X'
      return 0x1d;
    case 0x79: // 'y'
    case 0x59: // 'Y'
      return 0x1e;
    case 0x7a: // 'z'
    case 0x5a: // 'Z'
      return 0x1f;
    default:
      return undefined;
  }
};

const convertBigEndianBytesToUint = (bytes) => {
  let value = 0;
  for (let byte of bytes) {
    // Number.MAX_SAFE_INTEGER == 0x1FFFFFFFFFFFFF
    // Switch to BigInt when (value << 8) > 0xfffffffffff
    if (typeof value !== 'bigint' && value > 0xfffffffffff) {
      value = BigInt(value);
    }
    if (typeof value !== 'bigint') {
      // NOTE: left shift operator and bit OR only support up to 32 bit only on normal Numbers.
      // Using multiplication and addition instead.
      value = value * 256 + byte;
    } else {
      value = (value << 8n) | BigInt(byte);
    }
  }
  return value;
};

/**
 * Given an iterator of string or Uint8Array of Azam Codec encoded object, returns the first section as byte array,
 * or undefined if invalid data is found or iterator has no new value.
 *
 * @param {string|Uint8Array} iter string or Uint8Array iterator instance
 * @param {boolean} isString `true` if iterator is of string type
 * @returns Decoded byte array
 */
const decodeBytesIter = (iter, isString) => {
  let bytes = [];
  let prevNybble = undefined;
  let isOdd = false;
  let leadNybbleChecked = false;
  let count = 0;
  const nybbleValue = isString ? nybbleValueString : nybbleValueNum;
  for (;;) {
    const next = iter.next();
    // Invalid data or end of stream
    if (next == undefined || next.value == undefined || next.done) break;
    const byte = next.value;
    const value = nybbleValue(byte);
    // Invalid data found
    if (value == undefined) return undefined;
    count++;
    // Flip oddness
    isOdd = !isOdd;
    if (!leadNybbleChecked) {
      // If the first byte starts with a high nibble 0 (g or G), return error as invalid data
      if (value == 0x10) return undefined;
      leadNybbleChecked = true;
    }
    // Take previous nybble, shift left 4 and bit or current nybble
    if (!isOdd) {
      bytes.push(((prevNybble & 0xf) << 4) | (value & 0x0f));
    }
    // Remember current nybble for next iteration
    prevNybble = value;
    // If current nybble is a low nybble, this is the last one, so exit loop
    if (value >>> 4 == 0x0) break;
  }
  // Abort for stream ending with a high nybble value
  if (prevNybble !== undefined && prevNybble >> 4) return undefined;
  // If nybble count is odd, then there is one unwritten nybble.
  // Add the unwritten nybble, and shift whole byte array 4 bits to the right.
  if (isOdd && count > 0) {
    bytes.push((prevNybble & 0xf) << 4);
    let highNybble = 0x0;
    for (let i = 0; i < bytes.length; i++) {
      let byte = bytes[i];
      bytes[i] = (byte >>> 4) | highNybble;
      highNybble = (byte << 4) & 0xf0;
    }
  }
  return bytes.length > 0 ? bytes : undefined;
};

/**
 * Given a string or Uint8Array Azam Codec encoded object, returns the first section as byte array, or undefined if invalid data is found.
 *
 * @param {string|Uint8Array} source
 * @returns Decoded byte array
 */
const decodeBytes = (source) => {
  if (source == undefined || source == null) return undefined;
  const isString = typeof source === 'string' || source instanceof String;
  const iter = source[Symbol.iterator]();
  return decodeBytesIter(iter, isString);
};

/**
 * Given a string or Uint8Array Azam Codec encoded object, returns all sections as array of byte array,
 * or undefined if invalid data is found. If `count` is given only return the array if exist number
 * of sections equals or more than `count`.
 *
 * @param {string|Uint8Array} source
 * @param {number|undefined} count
 * @returns Decoded arrays of byte array
 */
const decodeAllBytes = (source, count) => {
  if (source == undefined || source == null) return undefined;
  const isString = typeof source === 'string' || source instanceof String;
  const iter = source[Symbol.iterator]();
  const nums = [];
  for (let i = 0; count == undefined || i < count; i++) {
    const bytes = decodeBytesIter(iter, isString);
    // Invalid data or end of stream
    if (bytes == undefined) break;
    nums.push(bytes);
  }
  if (count !== undefined) return nums.length == count ? nums : undefined;
  return nums.length > 0 ? nums : undefined;
};

/**
 * Given a string or Uint8Array Azam Codec encoded object, returns the first section as unsigned integer, or undefined if invalid data is found.
 *
 * @param {string|Uint8Array} source
 * @returns Decoded unsigned integer
 */
const decodeInt = (source) => {
  if (source == undefined || source == null) return undefined;
  const isString = typeof source === 'string' || source instanceof String;
  const iter = source[Symbol.iterator]();
  const bytes = decodeBytesIter(iter, isString);
  return bytes == undefined ? undefined : convertBigEndianBytesToUint(bytes);
};

/**
 * Given a string or Uint8Array Azam Codec encoded object, returns all sections as unsigned integer,
 * or undefined if invalid data is found. If `count` is given only return the array if exist number
 * of sections equals or more than `count`.
 *
 * @param {string|Uint8Array} source
 * @param {number|undefined} count
 * @returns Decoded unsigned integer array
 */
const decodeInts = (source, count) => {
  if (source == undefined || source == null) return undefined;
  const isString = typeof source === 'string' || source instanceof String;
  const iter = source[Symbol.iterator]();
  const nums = [];
  for (let i = 0; count == undefined || i < count; i++) {
    const bytes = decodeBytesIter(iter, isString);
    // Invalid data or end of stream
    if (bytes == undefined) break;
    nums.push(convertBigEndianBytesToUint(bytes));
  }
  if (count !== undefined) return nums.length == count ? nums : undefined;
  return nums.length > 0 ? nums : undefined;
};

export { decodeInt, decodeInts, decodeBytes, decodeAllBytes, decodeBytesIter };
