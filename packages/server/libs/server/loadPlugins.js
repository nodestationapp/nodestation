import path from "path";
// import fs_sys from "fs";
import { rootPath } from "@nstation/utils";

import loadRoute from "./loadRoute.js";
import nstationConfig from "../../../../nstation.config.js";

const core = [
  {
    resolve: "@nstation/core/auth/server/api/index.js",
  },
];

const loadPlugins = (router) => {
  let pluginsList = nstationConfig();

  pluginsList = Object.keys(pluginsList).map((key) => ({
    key,
    ...pluginsList[key],
    resolve: path.join(
      rootPath,
      "plugins",
      key,
      "server",
      "api_test",
      "index.js"
    ),
  }));

  let plugins = [...core, ...pluginsList];

  plugins.forEach(async (plugin) => {
    const { default: routes } = await import(plugin?.resolve);
    await loadRoute(router, routes);

    // const routes = await fs.getPluginFiles(
    //   path.join(plugin?.resolve, "server", "api_test", "index.js"),
    //   plugin?.key
    // );

    // const content = fs_sys.readFileSync(
    //   path.join(plugin?.resolve, "server", "api_test", "index.js")
    // );

    //   const tables = await fs.getPluginFiles(
    //     path.join(plugin?.resolve, "server", "schemas", "index.js"),
    //     plugin?.key,
    //     "schema"
    //   );

    //   tables.forEach(async (table) => {
    //     await upsertTable(table);
    //   });
  });

  return true;
};

export default loadPlugins;
