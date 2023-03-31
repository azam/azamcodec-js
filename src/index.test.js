import { test } from '@jest/globals';

const referenceSamples = [
  { enc: '0', dec: 0x00 },
  { enc: '1', dec: 0x01 },
  { enc: 'f', dec: 0x0f },
  { enc: 'h0', dec: 0x10 },
  { enc: 'h1', dec: 0x11 },
  { enc: 'hf', dec: 0x1f },
  { enc: 'z0', dec: 0xf0 },
  { enc: 'zf', dec: 0xff },
  { enc: 'hg0', dec: 0x100 },
  { enc: 'hg1', dec: 0x101 },
  { enc: 'hh1', dec: 0x111 },
  { enc: 'hzf', dec: 0x1ff },
  { enc: 'zzzf', dec: 0xffff },
  { enc: 'zzzzf', dec: 0xfffff },
  { enc: 'zzzzzf', dec: 0xffffff },
  { enc: 'zzzzzzf', dec: 0xfffffff },
  { enc: 'zzzzzzzf', dec: 0xffffffff },
  { enc: 'zzzzzzzzf', dec: 0xfffffffff },
  { enc: 'zzzzzzzzzf', dec: 0xffffffffff },
  { enc: 'zzzzzzzzzzf', dec: 0xfffffffffff },
  { enc: 'zzzzzzzzzzzf', dec: 0xffffffffffff },
  // Last value as normal Number (52-bits)
  { enc: 'zzzzzzzzzzzzf', dec: 0xfffffffffffff },
  // BigInts starts here
  { enc: 'hgggggggggggg0', dec: 0x10000000000000n },
  { enc: 'zzzzzzzzzzzzzf', dec: 0xffffffffffffffn },
  { enc: 'zzzzzzzzzzzzzzf', dec: 0xfffffffffffffffn },
  { enc: 'zzzzzzzzzzzzzzzf', dec: 0xffffffffffffffffn },
  { enc: 'zzzzzzzzzzzzzzzzf', dec: 0xfffffffffffffffffn },
  { enc: 'zzzzzzzzzzzzzzzzzf', dec: 0xffffffffffffffffffn },
  { enc: 'zzzzzzzzzzzzzzzzzzf', dec: 0xfffffffffffffffffffn },
];

/**
 * Convert integer to big endian byte array.
 *
 * @param {Number|BigInt} num Unsigned integer
 * @returns Big endian byte array
 */
const convertUintToBigEndianBytes = (num) => {
  if (num == undefined || num == null) return undefined;
  let bytes = [];
  // This is inefficient; we should do separate logic for numbers and bigint.
  num = BigInt(num);
  if (num < 0n) return undefined;
  for (;;) {
    let byte = num & 0xffn;
    bytes.unshift(Number(byte));
    num = num >> 8n;
    if (num === 0n) break;
  }
  return bytes;
};

test('index', () => {});

export { referenceSamples, convertUintToBigEndianBytes };
