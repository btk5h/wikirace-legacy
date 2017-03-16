import path from 'path'

import webpack, {DefinePlugin, ProvidePlugin, HotModuleReplacementPlugin} from 'webpack'
const {UglifyJsPlugin} = webpack.optimize

import HtmlPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import CleanPlugin from 'clean-webpack-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'

function when (condition, object) {
  return condition ? object : Array.isArray(object) ? [] : {}
}

function resolvePath (...components) {
  return path.resolve(__dirname, ...components)
}

export default ({production, stats} = {}) => ({
  entry: [
    'regenerator-runtime/runtime',
    ...when(!production, [
      'preact/devtools'
    ]),
    'normalize.css',
    'whatwg-fetch',
    resolvePath('src', 'index.js')
  ],
  output: {
    filename: 'bundle.js',
    path: resolvePath('dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{
          loader: 'standard-loader',
          options: {
            parser: 'babel-eslint',
            error: production
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['es2015', {
                loose: true,
                modules: false
              }],
              'stage-2'
            ],
            plugins: [
              ['transform-react-jsx', {
                pragma: '_preactCreateElement'
              }]
            ]
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: production,
              camelCase: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: false,
              minimize: production,
              camelCase: true
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: {
      index: '/index.html'
    },
    host: '0.0.0.0',
    inline: true,
    open: true
  },
  plugins: [
    new CleanPlugin([
      resolvePath('dist'),
      ...when(stats, [
        resolvePath('stats')
      ])
    ]),
    new HtmlPlugin({
      filename: 'index.html',
      template: resolvePath('src', 'index.ejs'),
      minify: !production ? false : {
        collapseWhitespace: true
      }
    }),
    new CopyPlugin([
      {from: resolvePath('src', '_redirects')},
      {from: resolvePath('src', 'manifest.json')}
    ]),
    new DefinePlugin({
      'process.env.NODE_ENV': production ? '"production"' : '"development"'
    }),
    new ProvidePlugin({
      _preactCreateElement: ['preact', 'h']
    }),
    ...when(stats, [
      new BundleAnalyzerPlugin({
        reportFilename: resolvePath('stats', 'bundle.html'),
        analyzerMode: 'static',
        openAnalyzer: false
      })
    ]),
    ...when(production, [
      new UglifyJsPlugin()
    ]),
    ...when(!production, [
      new HotModuleReplacementPlugin()
    ])
  ],
  node: {
    Buffer: false // https://github.com/webpack-contrib/css-loader/issues/454
  }
})
