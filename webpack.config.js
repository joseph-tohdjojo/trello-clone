const autoprefixer = require('autoprefixer')
const path = require('path')
const precss = require('precss')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/', 'index.js'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'index.bundle.js',
  },
  devServer: {
    contentBase: 'public/', // Relative directory for base of server
    publicPath: '/',
    inline: true,
    port: process.env.PORT || 1234, // Port Number
    host: '127.0.0.1', // Change to '0.0.0.0' for external facing server
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader', // translates CSS into CommonJS modules
            },
            {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins() {
                  // post css plugins, can be exported to postcss.config.js
                  return [precss, autoprefixer]
                },
              },
            },
            {
              loader: 'sass-loader', // compiles SASS to CSS
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/', 'index.html'),
    }),
    new ExtractTextPlugin('index.css'),
  ],
}
