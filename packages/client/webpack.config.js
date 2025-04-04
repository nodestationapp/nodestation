const path = require("path");
const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  const isProduction = env.NODE_ENV === "production";
  const envFile = isProduction ? ".env.production" : ".env.development";
  const envPath = path.resolve(__dirname, envFile);
  const envVars = require("dotenv").config({ path: envPath }).parsed || {};

  return {
    entry: "./src/index.js",
    mode: env.NODE_ENV === "production" ? "production" : "development",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    devServer: {
      static: path.join(__dirname, "dist"),
      port: 1337,
      historyApiFallback: {
        index: "index.html",
      },
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
    ],
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        libs: path.resolve(__dirname, "src/libs"),
        context: path.resolve(__dirname, "src/context"),
        components: path.resolve(__dirname, "src/components"),
        pages: path.resolve(__dirname, "src/pages"),
        assets: path.resolve(__dirname, "src/assets"),
        page_components: path.resolve(__dirname, "src/page_components"),
        plugins: path.resolve(__dirname, "../../plugins"),
        root: path.resolve(__dirname, "../../"),
        layouts: path.resolve(__dirname, "src/layouts"),
      },
    },
  };
};
