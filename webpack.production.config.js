const path = require('path');
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    'redoc-ui': [
      './src/index.js'
    ]
  },

  output:  {
    path: path.join(__dirname, 'static/redoc/dist'),
    library: 'RedocLayout',
    libraryTarget: 'umd',
    filename: '[name].js',
    chunkFilename: 'js/[name].js',
  },

  mode: 'production',

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js(x)?)(\?.*)?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            retainLines: true
          }
        }],
        include: [ path.join(__dirname, 'src') ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 50000,
            mimetype: 'application/font-woff',
            name: 'fonts/[name].[ext]'
          }
        }]
      }
    ]
  },

  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    }),
    new ExtractTextPlugin({
      filename: 'main.css',
      allChunks: true
    })
  ]

};