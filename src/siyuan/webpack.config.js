const path = require('path')
const PugPlugin = require('pug-plugin')

module.exports = (env, argv) => {
  return {
    mode: argv.mode || 'development',
    watch: argv.mode !== 'production',
    devtool: argv.mode !== 'production' ? 'eval' : false,
    resolve: {
      extensions: ['.pug'],
    },
    output: {
      publicPath: '',
      path: path.resolve(__dirname, 'dist'),
    },
    entry: {
      index: './src/index.pug',
      eula: './src/eula.pug',
      community: './src/community.pug',
      pricing: './src/pricing.pug',
      privacy: './src/privacy.pug',
      download: './src/download.pug',
      'distributors/lizhi': './src/distributors/lizhi.pug',
      'en/index': './src/en/index.pug',
      // "en/eula": './src/en/eula.pug',
      // "en/community": './src/en/community.pug',
      // "en/pricing": './src/en/pricing.pug',
      // "en/privacy": './src/en/privacy.pug',
      // "en/download": './src/en/download.pug',
    },
    plugins: [
      new PugPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: PugPlugin.loader, // PugPlugin already contain the pug-loader
          options: {
            method: 'render', // fastest method to generate static HTML files
          },
        },
      ],
    },
  }
}
