const webpack = require('webpack')
const {HotModuleReplacementPlugin} = webpack
const {UglifyJsPlugin, OccurrenceOrderPlugin} = webpack.optimize

const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const FailPlugin = require('webpack-fail-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

let isProduction = process.env.NODE_ENV === 'production'

let plugins = [
  FailPlugin,
  new CleanPlugin(['dist', 'reports']),
  new HtmlPlugin({
    filename: 'index.html',
    template: './src/index.ejs',
    title: 'Wikirace',
    minify: !isProduction ? false : {
      collapseWhitespace: true
    }
  }),
  new CopyPlugin([
    {from: './src/CNAME'}
  ])
]

if (isProduction) {
  plugins.push(new UglifyJsPlugin())
  plugins.push(new OccurrenceOrderPlugin())
  plugins.push(new BundleAnalyzerPlugin({
    reportFilename: '../reports/report.html',
    analyzerMode: 'static',
    openAnalyzer: false
  }))
} else {
  plugins.push(new HotModuleReplacementPlugin())
}

module.exports = {
  entry: [
    'whatwg-fetch',
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: './dist'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['standard']
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      }
    ]
  },
  devServer: {
    contentBase: 'dist',
    host: '0.0.0.0',
    open: true,
    hot: !isProduction,
    inline: true
  },
  standard: {
    parser: 'babel-eslint',
    emitErrors: true
  },
  plugins
}
