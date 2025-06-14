const fs = require("fs");
const path = require("path");
const VirtualModulesPlugin = require("webpack-virtual-modules");

const config = fs.readFileSync(
  `${process.env.ROOT_DIR}/nodestation.config.js`,
  "utf8"
);

module.exports = () => {
  const match = config.match(/plugins\s*:\s*\[([^\]]*)\]/)?.[1];

  const plugins = match
    .split(",")
    .map((str) => str.trim().replace(/^["']|["']$/g, ""))
    .filter((item) => item !== "");

  const pluginImportCode = `
  export default {
    plugins: [${plugins
      .map((plugin) => {
        if (plugin.startsWith("./")) {
          plugin = plugin.replace("./", `${process.env.ROOT_DIR}/`);
        }

        const client = path.join(plugin, "client/index.js");

        return ` import("${client}")`;
      })
      .join(",\n")}],
  };`;

  const virtualModules = new VirtualModulesPlugin({
    "node_modules/@nstation/config/plugin-imports.js": pluginImportCode,
  });

  return virtualModules;
};
