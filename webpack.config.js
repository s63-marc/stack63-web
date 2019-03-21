const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const SvgUrlLoader = require('svg-url-loader');


const devMode = process.env.NODE_ENV !== 'production'

if (devMode) {
  console.log(">>> Deploying to production...")
}

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'Stack63',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.[hash].js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader'
        }
      }
    ]
  },
  plugins: [
    // new uglifyJsPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new CopyPlugin([{
      from: 'src/**/*.png',
      to: 'assets/images/[name].[ext]'
    }]),
    new CopyPlugin([{
      from: 'src/**/*.svg',
      to: 'assets/images/[name].[ext]'
    }])
  ]
};
