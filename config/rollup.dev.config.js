// rollup.config.js
const babel = require('rollup-plugin-babel');
const serve = require('rollup-plugin-serve');
const { uglify } = require('rollup-plugin-uglify');
const pkg = require('../package.json');

const env = process.env.NODE_ENV;

const config = {
  input: 'src/index.js',
  output: {
    format: 'iife',
    banner: `/* mp.js v${pkg.version} */`,
    file: 'dist/mp.js' // equivalent to --output
  },
  plugins: [
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    serve({
      contentBase: ['.']
    })
  ]
};

export default config;
