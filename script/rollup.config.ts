import { join } from 'path'
import { RollupOptions } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import alias from '@rollup/plugin-alias'
import json from '@rollup/plugin-json'
import copy from 'rollup-plugin-copy'

export default (env = 'production') => {
  const options: RollupOptions = {
    input: join(__dirname, "../src/main/index.ts"),
    output: {
      file: join(__dirname, "../dist/main/_.js"),
      format: "cjs",
      name: "ElectronMainBundle",
      sourcemap: false,
    },
    plugins: [
      nodeResolve({ preferBuiltins: true, browser: true }),
      commonjs(),
      json(),
      esbuild({
        include: /\.[jt]sx?$/, 
        exclude: /node_modules/, 
        sourceMap: false, 
        minify: process.env.NODE_ENV === "production",
        target: "esnext", 
        jsxFactory: "React.createElement",
        jsxFragment: "React.Fragment",
        define: {
          __VERSION__: '"x.y.z"',
        },
        loaders: {
          ".json": "json",
          ".js": "jsx",
        },
      }),
      alias({
        entries: [
          { find: "@main", replacement: join(__dirname, "../src/main") },
        ],
      }),
      copy({
        targets: [
          {
            src: join(__dirname, "../src/preload"),
            dest: join(__dirname, "../dist"),
          },
        ],
      }),
    ],
    external: [
      "crypto",
      "assert",
      "fs",
      "util",
      "os",
      "events",
      "child_process",
      "http",
      "https",
      "path",
      "electron",
    ],
  };

  return options
}
