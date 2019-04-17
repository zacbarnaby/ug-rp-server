const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// generate the client_packages output directory
const outputPath = __dirname.replace('src\\client', 'client_packages').replace('src', 'dist');

module.exports = (env, options) => {
  return {
    entry: ['./main.js'],
    output: {
      path: outputPath,
      filename: 'main.js',
    },
    devServer: {
      contentBase: outputPath,
    },
    module: {
      rules: [
        {
          test: /.(s?)css$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.vue$/,
          use: [
            { loader: 'vue-loader' },
            { loader: 'vue-svg-inline-loader' },
          ],
        },
        {
          test: /\.html$/,
          use: 'vue-html-loader',
        },
        {
          test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
          use: 'url-loader?limit=10000&name=[name].[hash:7].[ext]',
        },
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        mode: options.mode,
      }),
      new VueLoaderPlugin(),
      new CopyWebpackPlugin([
        { from: './index.html' },
      ]),
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.common.js',
      },
    },
  };
};