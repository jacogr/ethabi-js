var nodeExternals = require('webpack-node-externals');
var path = require('path');

var ENV = process.env.NODE_ENV || 'development';
var isProd = ENV === 'production';

module.exports = {
  debug: !isProd,
  cache: !isProd,
  devtool: '#source-map',
  context: path.join(__dirname, './lib'),
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    index: './ethAbi.js'
  },
  output: {
    path: path.join(__dirname, '.'),
    filename: 'index.js',
    library: 'EthAbi',
    libraryTarget: 'commonjs'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  }
};
