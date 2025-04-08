import path from "path";
import { upsertTable } from "@nstation/db";
import { fs, rootPath } from "@nstation/utils";

import loadRoute from "./loadRoute.js";
import nstationConfig from "../../../../nstation.config.js";

const loadPlugins = (server) => {
  let pluginsList = nstationConfig();

  pluginsList = Object.keys(pluginsList).map((key) => ({
    key,
    ...pluginsList[key],
    resolve: path.join(rootPath, "plugins", key),
  }));

  pluginsList.forEach(async (plugin) => {
    const routes = await fs.getPluginFiles(
      path.join(plugin?.resolve, "server", "api", "**", "*.js"),
      plugin?.key
    );

    const tables = await fs.getPluginFiles(
      path.join(plugin?.resolve, "server", "schemas", "index.js"),
      plugin?.key,
      "schema"
    );

    routes.forEach(async (file) => {
      await loadRoute(server, file);
    });

    tables.forEach(async (table) => {
      await upsertTable(table);
    });
  });

  return true;
};

export default loadPlugins;
