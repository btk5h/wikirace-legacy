const webpack = require('webpack')
const {HotModuleReplacementPlugin} = webpack
const {UglifyJsPlugin, OccurrenceOrderPlugin} = webpack.optimize

let plugins = []

let isProduction = process.env.NODE_ENV === 'production'

if (isProduction) {
  plugins.push(new UglifyJsPlugin())
  plugins.push(new OccurrenceOrderPlugin())
} else {
  plugins.push(new HotModuleReplacementPlugin())
}

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: './dist'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.css$/, loader: 'style!css!postcss'}
    ]
  },
  devServer: {
    contentBase: 'dist',
    host: '0.0.0.0',
    open: true,
    hot: !isProduction,
    inline: true
  },
  plugins
}
