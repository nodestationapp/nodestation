const path = require("path");
const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VirtualModulesPlugin = require("webpack-virtual-modules");
const fs = require("fs");
const config = fs.readFileSync(
  `${process.env.ROOT_DIR}/nodestation.config.js`,
  "utf8"
);

const match = config.match(/plugins\s*:\s*\[([^\]]*)\]/)?.[1];

const plugins = match
  .split(",")
  .map((str) => str.trim().replace(/^["']|["']$/g, ""));

const pluginImportCode = `
export default {
  plugins: [${plugins
    .map(
      (name) =>
        ` {client: import("${name}/client/index.js"), server: "${name}/server"}`
    )
    .join(",\n")}],
};`;

const virtualModules = new VirtualModulesPlugin({
  "node_modules/@nstation/config/plugin-imports.js": pluginImportCode,
});

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
        {
          test: /\.jsx?$/,
          include: [
            path.resolve(process.env.ROOT_DIR, "plugins"),
            path.resolve(process.env.ROOT_DIR, "node_modules/@nstation"),
            path.resolve(process.env.ROOT_DIR, "packages"),
          ],
          loader: "babel-loader",
        },
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
      virtualModules,
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
        plugins: path.resolve(process.env.ROOT_DIR, "plugins"),
        root: process.env.ROOT_DIR,
      },
    },
  };
};
