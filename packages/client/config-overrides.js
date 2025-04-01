const {
  override,
  removeModuleScopePlugin,
  addWebpackModuleRule,
  addBabelPreset,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  removeModuleScopePlugin(),

  addBabelPreset(["@babel/preset-react", { runtime: "automatic" }]),

  addWebpackModuleRule({
    test: /\.(js|jsx)$/,
    include: [
      path.resolve(__dirname, "../design-system"),
      path.resolve(__dirname, "../../"),
    ],
    loader: "babel-loader",
    options: {
      presets: [["@babel/preset-react", { runtime: "automatic" }]],
    },
  }),

  addWebpackAlias({
    libs: path.resolve(__dirname, "src/libs"),
    context: path.resolve(__dirname, "src/context"),
    components: path.resolve(__dirname, "src/components"),
    pages: path.resolve(__dirname, "src/pages"),
    assets: path.resolve(__dirname, "src/assets"),
    page_components: path.resolve(__dirname, "src/page_components"),
    plugins: path.resolve(__dirname, "../../plugins"),
    root: path.resolve(__dirname, "../../"),
  })
);
