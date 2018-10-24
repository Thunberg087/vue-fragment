const config = require('./package.json');

const rollup = require('rollup'),
      minify = require('rollup-plugin-minify-es'),
      babel  = require('rollup-plugin-babel')

const i = {
            input: './src/index.js',
            plugins: [
              babel({ exclude: 'node_modules/**' }),
              minify()
            ]
          },

      o = {
            file: config.main,
            format: 'umd',
            name: config.global,
            exports: 'named',
          }

async function build() {
  const bundle = await rollup.rollup(i)
  const { code, map } = await bundle.generate(o)

  await bundle.write(o)
}

build()
  .then(() => { console.log("👌") })
  .catch(err => console.error(err.message, err.stack))
