import { test, expect } from '@jest/globals';
import { encodeInt, encodeInts } from './index.js';
import { referenceSamples } from './index.test.js';

test.each(referenceSamples)("encodeInt('$dec')", ({ enc, dec }) => {
  expect(encodeInt(dec)).toStrictEqual(enc);
});

test('encodeInt(undefined|null)', () => {
  expect(encodeInt(undefined)).toStrictEqual(undefined);
  expect(encodeInt(null)).toStrictEqual(undefined);
});

test('encodeInt(-1|-1n)', () => {
  expect(encodeInt(-1)).toStrictEqual(undefined);
  expect(encodeInt(-1n)).toStrictEqual(undefined);
});

test.each([
  { enc: '0', dec: [0x00] },
  { enc: '0123', dec: [0x00, 0x01, 0x02, 0x03] },
  { enc: 'xytxvyyfh5wgg1', dec: [0xdeadbeef, 0x15, 0xc001] },
  { enc: undefined, dec: [undefined] },
  { enc: undefined, dec: [0x00, undefined, 0x02] },
])("encodeInts('$dec')", ({ enc, dec }) => {
  expect(encodeInts(...dec)).toStrictEqual(enc);
});

test('encodeInts(undefined|null)', () => {
  expect(encodeInts(undefined)).toStrictEqual(undefined);
  expect(encodeInts(null)).toStrictEqual(undefined);
});

test('encodeInts()', () => {
  expect(encodeInts()).toStrictEqual('');
});
