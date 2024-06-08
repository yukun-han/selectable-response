import path from 'node:path';
// Convert CommonJS modules to ES6
import commonjs from '@rollup/plugin-commonjs';
// Convert .json files to ES6 modules
import json from '@rollup/plugin-json';
// Locate modules using the Node resolution algorithm,
// for using third party modules in node_modules.
import resolve from '@rollup/plugin-node-resolve';
// Minify generated es bundle.
import terser from '@rollup/plugin-terser';
// Enable typescript support for rollup.
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

import pkg from './package.json' assert { type: 'json' };

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  // `@rollup/plugin-typescript` package needs tslib as a peer dependency.
  // If not specified, it breaks installation in consumer applications using
  // yarn pnp mode.
  'tslib',
];

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      dir: path.dirname(pkg.exports.require),
      entryFileNames: '[name].cjs',
      exports: 'named',
      format: 'cjs',
      sourcemap: true,
    },
    {
      dir: path.dirname(pkg.exports.import),
      entryFileNames: '[name].js',
      exports: 'named',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    json(),
    commonjs(),
    resolve(),
    terser(),
    typescript({
      noEmit: true,
      emitDeclarationOnly: false,
      declaration: false,
      declarationMap: false,
      outDir: undefined,
    }),
  ],
  external,
});
