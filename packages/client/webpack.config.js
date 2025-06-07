const path = require("path");
const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env) => {
  const isProduction = env.NODE_ENV === "production";
  const envFile = isProduction ? ".env.production" : ".env.development";
  const envPath = path.resolve(__dirname, envFile);
  const envVars = require("dotenv").config({ path: envPath }).parsed || {};

  return {
    entry: "./src/index.js",
    mode: env.NODE_ENV === "production" ? "production" : "development",
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(process.env.ROOT_DIR, "build"),
      publicPath: "/",
      clean: true,
    },
    devtool: "source-map",
    devServer: {
      static: path.join(process.env.ROOT_DIR, "build"),
      port: 1337,
      hot: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [{ loader: "@svgr/webpack", options: { icon: true } }],
        },
        {
          test: /\.(png|jpe?g|gif|webp|ico|woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        favicon: path.resolve(__dirname, "public/favicon.ico"),
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(envVars),
      }),
      new WebpackBar(),
      // new BundleAnalyzerPlugin(),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    ],
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        utils: path.resolve(__dirname, "src/utils"),
        icons: path.resolve(__dirname, "src/icons"),
        contexts: path.resolve(__dirname, "src/contexts"),
        plugins: path.join(process.env.ROOT_DIR, "plugins"),
      },
    },
  };
};
