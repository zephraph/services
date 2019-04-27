import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import json from "rollup-plugin-json";
// @ts-ignore
import { terser } from "rollup-plugin-terser";

const pkg = require("./package.json");

export default {
  input: `src/index.ts`,
  output: [
    { file: pkg.main, name: "services", format: "cjs", sourcemap: true },
    { file: pkg.module, format: "es", sourcemap: true }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [
    "url",
    "fs",
    "path",
    "http",
    "stream",
    "https",
    "zlib",
    "encoding",
    "assert",
    "tty",
    "util",
    "os",
    "child_process",
    "events"
  ],
  watch: {
    include: "src/**"
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    terser(),

    // Resolve source maps to the original source
    sourceMaps()
  ]
};
