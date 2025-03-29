const {
  override,
  removeModuleScopePlugin,
  addWebpackModuleRule,
  addBabelPreset,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  removeModuleScopePlugin(),

  addBabelPreset([
    "@babel/preset-react",
    { runtime: "automatic" }, // Automatyczna obsługa JSX w React 17+
  ]),

  addWebpackModuleRule({
    test: /\.(js|jsx)$/,
    include: [path.resolve(__dirname, "../../plugins")], // Obsługa JSX w pluginach
    loader: "babel-loader",
    options: {
      presets: [
        [
          "@babel/preset-react",
          { runtime: "automatic" }, // Automatyczne dodawanie React do JSX
        ],
      ],
    },
  })
);
