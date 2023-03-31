import { test, expect } from '@jest/globals';
import { TextEncoder } from 'util';
import { decodeInt, decodeInts, decodeBytes, decodeAllBytes } from './index.js';
import { referenceSamples, convertUintToBigEndianBytes } from './index.test.js';

test('decodeNybbleValues', () => {
  const LOWER_ALPHABETS = '0123456789abcdef';
  const HIGHER_ALPHABETS = 'ghjkmnpqrstvwxyz';
  for (let i = 0; i < 256; i++) {
    let enc = '';
    if (i >>> 4 > 0) {
      enc = HIGHER_ALPHABETS[i >>> 4];
    }
    enc += LOWER_ALPHABETS[i & 0xf];
    let dec = i;

    const arr = new TextEncoder().encode(enc);
    // String argument
    expect(decodeInt(enc)).toStrictEqual(dec);
    // Uint8Array argument
    expect(decodeInt(arr)).toStrictEqual(dec);
    // Bytes return
    const bytes = convertUintToBigEndianBytes(dec);
    expect(decodeBytes(enc)).toStrictEqual(bytes);
    expect(decodeBytes(arr)).toStrictEqual(bytes);
  }

  const CAPS_LOWER_ALPHABETS = '0123456789ABCDEF';
  const CAPS_HIGHER_ALPHABETS = 'GHJKMNPQRSTVWXYZ';
  for (let i = 0; i < 256; i++) {
    let enc = '';
    if (i >>> 4 > 0) {
      enc = CAPS_HIGHER_ALPHABETS[i >>> 4];
    }
    enc += CAPS_LOWER_ALPHABETS[i & 0xf];
    let dec = i;

    const arr = new TextEncoder().encode(enc);
    // String argument
    expect(decodeInt(enc)).toStrictEqual(dec);
    // Uint8Array argument
    expect(decodeInt(arr)).toStrictEqual(dec);
    // Bytes return
    const bytes = convertUintToBigEndianBytes(dec);
    expect(decodeBytes(enc)).toStrictEqual(bytes);
    expect(decodeBytes(arr)).toStrictEqual(bytes);
  }

  // alternate chars
  const ALTERNATES = [
    { enc: 'o', dec: 0x0 },
    { enc: 'O', dec: 0x0 },
    { enc: 'i', dec: 0x1 },
    { enc: 'I', dec: 0x1 },
    { enc: 'l', dec: 0x1 },
    { enc: 'L', dec: 0x1 },
  ];
  for (let sample of ALTERNATES) {
    let enc = sample.enc;
    let dec = sample.dec;

    const arr = new TextEncoder().encode(enc);
    // String argument
    expect(decodeInt(enc)).toStrictEqual(dec);
    // Uint8Array argument
    expect(decodeInt(arr)).toStrictEqual(dec);
    // Bytes return
    const bytes = convertUintToBigEndianBytes(dec);
    expect(decodeBytes(enc)).toStrictEqual(bytes);
    expect(decodeBytes(arr)).toStrictEqual(bytes);
  }
});

test.each(referenceSamples)("decodeInt|decodeBytes('$enc')", ({ enc, dec }) => {
  const arr = new TextEncoder().encode(enc);
  // String argument
  expect(decodeInt(enc)).toStrictEqual(dec);
  // Uint8Array argument
  expect(decodeInt(arr)).toStrictEqual(dec);
  // Bytes return
  const bytes = convertUintToBigEndianBytes(dec);
  expect(decodeBytes(enc)).toStrictEqual(bytes);
  expect(decodeBytes(arr)).toStrictEqual(bytes);
});

test.each(['', '_', 'h', 'hj', 'hjk', 'hjkm', 'hgh', 'g1', 'gg1', 'h_'])(
  "decodeInt|decodeBytes('%s')==undefined",
  (enc) => {
    const arr = new TextEncoder().encode(enc);
    // String argument
    expect(decodeInt(enc)).toStrictEqual(undefined);
    // Uint8Array argument
    expect(decodeInt(arr)).toStrictEqual(undefined);
    // Bytes return
    const bytes = convertUintToBigEndianBytes(undefined);
    expect(decodeBytes(enc)).toStrictEqual(bytes);
    expect(decodeBytes(arr)).toStrictEqual(bytes);
  }
);

test.each([undefined, null])('decodeInt|decodeBytes(%p)', (value) => {
  // String argument
  expect(decodeInt(value)).toStrictEqual(undefined);
  // Uint8Array argument
  expect(decodeInt(value)).toStrictEqual(undefined);
  // Bytes return
  expect(decodeBytes(value)).toStrictEqual(undefined);
});

test.each([
  ['0', [0x00]],
  ['0123', [0x00, 0x01, 0x02, 0x03]],
  ['xytxvyyfh5wgg1', [0xdeadbeef, 0x15, 0xc001]],
])("decodeInts('%s')", (value, expected) => {
  const arr = new TextEncoder().encode(value);
  // String argument
  expect(decodeInts(value)).toStrictEqual(expected);
  // Uint8Array argument
  expect(decodeInts(arr)).toStrictEqual(expected);
  // Bytes return
  const bytes = expected == undefined ? undefined : expected.map((num) => convertUintToBigEndianBytes(num));
  expect(decodeAllBytes(value)).toStrictEqual(bytes);
  expect(decodeAllBytes(arr)).toStrictEqual(bytes);
});

test.each([
  ['0', 0, []],
  ['0', 1, [0x00]],
  ['0', 2, undefined],
  ['0123', 2, [0x00, 0x01]],
  ['xytxvyyfh5wgg1', 0, []],
  ['xytxvyyfh5wgg1', 1, [0xdeadbeef]],
  ['xytxvyyfh5wgg1', 2, [0xdeadbeef, 0x15]],
  ['xytxvyyfh5wgg1', 3, [0xdeadbeef, 0x15, 0xc001]],
  ['xytxvyyfh5wgg1', 4, undefined],
  // ['zzzzzzz0', 0xfffffff0n],
])("decodeInts|decodeAllBytes('%s', %i)", (value, count, expected) => {
  // String argument
  expect(decodeInts(value, count)).toStrictEqual(expected);
  // Uint8Array argument
  const arr = new TextEncoder().encode(value);
  expect(decodeInts(arr, count)).toStrictEqual(expected);
  // Bytes return
  const bytes = expected == undefined ? undefined : expected.map((num) => convertUintToBigEndianBytes(num));
  expect(decodeAllBytes(arr, count)).toStrictEqual(bytes);
});

test.each([undefined, null, ''])('decodeInts|decodeAllBytes(%p)', (value) => {
  expect(decodeInts(value)).toStrictEqual(undefined);
  expect(decodeInts(value)).toStrictEqual(undefined);
  expect(decodeInts(value)).toStrictEqual(undefined);
  expect(decodeAllBytes(value)).toStrictEqual(undefined);
  expect(decodeAllBytes(value)).toStrictEqual(undefined);
  expect(decodeAllBytes(value)).toStrictEqual(undefined);
});
