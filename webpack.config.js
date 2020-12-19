const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const path = require('path');

const config = {
  entry: __dirname + "/src/index.js",
  output: {
    filename: 'bundle.js',
    path: __dirname + "/public"
  },
  devtool: 'none',

  devServer: {
    disableHostCheck: true,
    contentBase: "./public", 
    historyApiFallback: true,
    inline: true,
    hot: true
  },
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
      template: "public/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: `static/css/[name].[hash:8].css`
    }),
    new ProgressBarPlugin()
  ],

  mode: 'development'
}

module.exports = config;