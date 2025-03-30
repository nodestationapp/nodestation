const {
  override,
  removeModuleScopePlugin,
  addWebpackModuleRule,
  addBabelPreset,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  removeModuleScopePlugin(),

  addBabelPreset(["@babel/preset-react", { runtime: "automatic" }]),

  addWebpackModuleRule({
    test: /\.(js|jsx)$/,
    include: [path.resolve(__dirname, "../design-system")],
    loader: "babel-loader",
    options: {
      presets: [["@babel/preset-react", { runtime: "automatic" }]],
    },
  })
);
