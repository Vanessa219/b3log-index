const path = require('path')
const PugPlugin = require('pug-plugin');

module.exports = (env, argv) => {
  return {
    mode: argv.mode || 'development',
    watch: argv.mode !== 'production',
    devtool: argv.mode !== 'production' ? 'eval' : false,
    resolve: {
      extensions: ['.pug'],
    },
    output: {
      publicPath:"",
      path: path.resolve(__dirname, 'dist'),
    },
    entry: {
      // all scripts and styles can be used in Pug,
      // do not need to define JS and SCSS in the webpack entry

      // define Pug files in entry:
      index: './src/index.pug',      // output index.html
      // ...
    },
    plugins: [
      // enable processing of Pug files from entry
      new PugPlugin()
    ],

    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: PugPlugin.loader, // PugPlugin already contain the pug-loader
          options: {
            method: 'render', // fastest method to generate static HTML files
          }
        }
      ],
    },
  }
}
