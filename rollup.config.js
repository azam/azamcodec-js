import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
// NOTE: Use this after import assertion is supported on eslint
// https://github.com/eslint/eslint/discussions/15305
// import pkg from './package.json' assert { type: 'json' };
import fs from 'fs';
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

export default [
  {
    input: 'types/index.d.ts',
    output: [
      {
        file: pkg.exports.import.replace(/\.js$/, '.d.ts'),
        format: 'esm',
      },
      {
        file: pkg.exports.require.replace(/\.js$/, '.d.ts'),
        format: 'esm',
      },
      {
        file: pkg.exports.import.replace(/\.js$/, '.full.d.ts'),
        format: 'esm',
      },
      {
        file: pkg.exports.require.replace(/\.js$/, '.full.d.ts'),
        format: 'esm',
      },
    ],
    plugins: [dts()],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.exports.import,
        format: 'esm',
        sourcemap: true,
        plugins: [terser()],
      },
      {
        file: pkg.exports.require,
        format: 'cjs',
        sourcemap: true,
        plugins: [terser()],
      },
      {
        file: pkg.exports.import.replace(/\.js$/, '.full.js'),
        format: 'esm',
        sourcemap: true,
      },
      {
        file: pkg.exports.require.replace(/\.js$/, '.full.js'),
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
];
