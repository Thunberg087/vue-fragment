const rollup = require('rollup'),
      minify = require('rollup-plugin-minify-es')

const i = { input: './src/index.js', plugins: [minify()] },
      o = { file: './dist/vue-fragments.min.js',
            format: 'umd',
            name: 'VFragment'
          }

async function build() {
  const bundle = await rollup.rollup(i)
  const { code, map } = await bundle.generate(o)

  await bundle.write(o)
}

build()
  .then(() => { console.log("👌") })
  .catch(err => console.error(err.message, err.stack))
