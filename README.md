# azamcodec-rs

[![Build Status](https://github.com/azam/azamcodec-js/actions/workflows/build.yml/badge.svg)](https://github.com/azam/azamcodec-js/actions/workflows/build.yml)
[![npm](https://badge.fury.io/js/azamcodec.svg)](https://badge.fury.io/js/azamcodec)

An encoder and decoder implementation in Javascript for [Azam Codec](https://github.com/azam/azamcodec), a lexicographically sortable multi-section base16 encoding of byte array. Zero external dependencies.

## License

MIT Licence
Copyright (c) 2022 Azamshul Azizy

## Usage

Import the module and start using it.

### Decoding

```js
import { decodeInt, decodeInts } from '@azamshul/azamcodec';

// Decode first section of Azam Codec encoded string as unsigned integer.
// "xytxvyyf" decodes to 0xdeadbeefu32, the rest of string is ignored.
let x = decodeInt('xytxvyyfh5wgg1'); // 0xdeadbeef

// Decode multiple sections of Azam Codec encoded string to aan array of unsigned integers.
// "xytxvyyf" decodes to 0xdeadbeef.
// "h5" decodes to 0x15.
// "wgg1" decodes to 0xc001.
let x = decodeInts('xytxvyyfh5wgg1'); // [0xdeadbeefu32, 0x15u8, c001u16]
```

### Encoding

```js
import { encodeInt, encodeInts } from '@azamshul/azamcodec';

// Encode unsigned integer value as Azam Codec encoded string.
// 0xdeadbeef encodes to "xytxvyyf".
let x = encodeInt(0xdeadbeef); // "xytxvyyf"

// Encode array of unsigned integer value as multi section Azam Codec encoded string.
// 0xdeadbeefu32 encodes to "xytxvyyf".
// 0x15u8 encodes to "h5".
// 0xc001u16 encodes to "wgg1".
let x = encodeInts(0xdeadbeefu32, 0x15u8, 0xc001u16); // "xytxvyyfh5wgg1"
```

## Development

Standard Javascript development applies. Currently Jest do not support ECMAScript modules out of the box, so run with `NODE_OPTIONS=--experimental-vm-modules npx jest` is needed to run tests (apply to VS Code `launch.json` as well), as stated [here](https://jestjs.io/ja/docs/ecmascript-modules).
