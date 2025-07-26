const path = require("path");
const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackConfigImports = require("./webpackConfigImports.js");

// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env) => {
  const envVars = process.env;
  const publicEnvVars = Object.keys(envVars)
    .filter((key) => key.startsWith("PUBLIC_"))
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {});

  console.log(`ENVS: ${publicEnvVars}`);

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
      new webpack.HotModuleReplacementPlugin(),
      webpackConfigImports(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(publicEnvVars),
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
