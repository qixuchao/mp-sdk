// rollup.config.js
const babel = require('rollup-plugin-babel');
const serve = require('rollup-plugin-serve');
const { uglify } = require('rollup-plugin-uglify');
const replace = require('rollup-plugin-replace');
const pkg = require('../package.json');

const env = process.env.NODE_ENV;

const config = {
  input: 'src/index.js',
  output: {
    format: 'iife',
    file: 'dist/mp.js' // equivalent to --output
    //name: "_M_P_"
  },
  plugins: [
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    replace({
      __VERSION__: pkg.version
    }),
    uglify({
      compress: {}
    })
  ]
};

export default config;
