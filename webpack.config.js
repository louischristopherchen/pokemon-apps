const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const path = require('path');

var config = {
  devtool: 'eval-source-map',
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/i,
        exclude: /node_modules/,
        loader: 'url-loader',
      }
    ]
  },
  resolve: {
    extensions: ['*', '.mjs', '.js', '.jsx', '.vue', '.json', '.gql', '.graphql']
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true
  }
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.mode = "development";
    config.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new Dotenv({ path: './.dev.env' })
    ];
  } else if (argv.mode === "production") {
    config.devtool= 'cheap-module-source-map';
    config.mode = "production";
    config.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new Dotenv({ path: './.prod.env' })
    ];
  }
  return config;
}