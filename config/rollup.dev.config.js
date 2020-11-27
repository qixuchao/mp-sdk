// rollup.config.js
const babel = require('rollup-plugin-babel');
const serve = require('rollup-plugin-serve');
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

const env = process.env.NODE_ENV;

const config = {
  input: 'src/index.js',
  output: {
    format: 'iife',
    banner: `/* mp.js v${pkg.version} */`,
    file: 'tmp/mp.js' // equivalent to --output
  },
  plugins: [
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    serve({
      contentBase: ['.'],
      onListening: function (server) {
        server.on('request', function (req, res) {
          const send = body => {
            res.write(body);
            res.end();
          };

          if (/\/media\/\d+.js/.test(req.url)) {
            const filePath = path.resolve('.', '.' + req.url);
            const sdkFilePath = path.resolve('.', './tmp/mp.js');

            try {
              const content = fs.readFileSync(filePath);
              const sdkContent = fs.readFileSync(sdkFilePath);
              send(content.toString() + '\n' + sdkContent.toString());
            } catch (e) {
              send(e);
              console.log(e);
            }
          }
        });
      }
    })
  ]
};

export default config;
