const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const path = require('path');

const config = {
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + '/build',
    filename: "[name].[chunkhash:8].js",
    chunkFilename: "[name].[chunkhash:8].chunk.js",
    publicPath: ''
  },
  devtool: 'none',
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: ['node_modules'],
    alias: {
      "Actions": path.join(__dirname, "src/Actions"),
      "Components": path.join(__dirname, "src/Components"),
      "Containers": path.join(__dirname, "src/Containers"),
      "Reducers": path.join(__dirname, "src/Reducers"),
      "Routes": path.join(__dirname, "src/Routes"),
      "Store": path.join(__dirname, "src/Store"),
      "api.js": path.join(__dirname, "src/api.js"),
      "base.js": path.join(__dirname, "src/base.js")
    }
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-react','@babel/preset-env'],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader'
        ],
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: "index.html",
      template: "public/index.prod.html"
    }),
    new MiniCssExtractPlugin({
      filename: `[name].[hash:8].css`
    }),
    new ProgressBarPlugin()
  ],

  mode: 'production'
}

module.exports = config;