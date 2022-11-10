import 'dotenv/config';
import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import buble from '@rollup/plugin-buble';
import replace from '@rollup/plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

const configPlugins = [
  nodeResolve({
    extensions: ['.js', '.jsx'],
    main: true,
    browser: true,
  }),
  babel({
    babelHelpers: 'bundled',
  }),
  commonjs(),
  json(),
  replace({
    'process.env': JSON.stringify({
      ENDPOINT_ANALYTICS_URL: process.env.ENDPOINT_ANALYTICS_URL,
    }),
    preventAssignment: true,
  }),
  buble({
    objectAssign: true,
    transforms: {
      // make async/await work by default (no transforms)
      asyncAwait: false,
    },
  }),
  terser({ compress: { evaluate: false } }),
  uglify(),
];

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'build/lib/bundles/bundle.esm.min.js',
        format: 'esm',
        plugins: [terser()],
        sourcemap: true,
      },
    ],
    plugins: configPlugins,
  },
  {
    input: 'src/analytics.js',
    output: [
      {
        // file: 'build/analytics.js',
        file: '/home/vietredweb/viet/redweb-templates/bi/public/analytics.js',
        format: 'iife',
        name: 'AesirAnalytics',
      },
    ],
    plugins: configPlugins,
  },
];
