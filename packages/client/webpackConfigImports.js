const fs = require("fs");
const path = require("path");
const VirtualModulesPlugin = require("webpack-virtual-modules");
const requireFromString = require("require-from-string");

const config = fs.readFileSync(
  `${process.env.ROOT_DIR}/nodestation.config.js`,
  "utf8"
);

module.exports = () => {
  const parsedConfig = requireFromString(config);

  const plugins = parsedConfig.plugins.map((plugin) => {
    return plugin.resolve || plugin;
  });

  const pluginImportCode = `
  ${plugins
    .map((plugin, index) => {
      if (plugin.startsWith("./")) {
        plugin = plugin.replace("./", `${process.env.ROOT_DIR}/`);
      }

      const client = path.join(plugin, "client/index.js");

      return `import plugin${index} from "${client}"`;
    })
    .join("\n")}

  export default {
    plugins: [${plugins
      .map((_, index) => {
        return `plugin${index}`;
      })
      .join(",\n")}],
  };`;

  const virtualModules = new VirtualModulesPlugin({
    "node_modules/@nstation/config/plugin-imports.js": pluginImportCode,
  });

  return virtualModules;
};
