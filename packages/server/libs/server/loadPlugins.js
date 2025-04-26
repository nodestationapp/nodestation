import path from "path";
import fs_sys from "fs";
import glob from "glob";
import { upsertTable } from "@nstation/db";

import loadRoute from "./loadRoute.js";

const core = [
  {
    resolve: "@nstation/core/auth/server",
  },
  {
    resolve: "@nstation/core/media/server",
  },
];

const loadPlugins = (router) => {
  // let pluginsList = nstationConfig();

  // pluginsList = Object.keys(pluginsList).map((key) => ({
  //   key,
  //   ...pluginsList[key],
  //   resolve: path.join(
  //     rootPath,
  //     "plugins",
  //     key,
  //     "server",
  //     "api_test",
  //     "index.js"
  //   ),
  // }));

  let plugins = [...core];

  plugins.forEach(async (plugin) => {
    //ROUTES
    const { default: routes } = await import(`${plugin?.resolve}/api/index.js`);
    await loadRoute(router, routes);

    //SCHEMAS
    let resolved = import.meta.resolve(plugin?.resolve);
    resolved = resolved.replace(/^file:\/*/, "/");

    const schemas = glob.sync(path.join(resolved, "schemas", "*.json"), {
      nodir: true,
    });

    schemas.forEach(async (schema) => {
      let file = fs_sys.readFileSync(schema, "utf-8");
      file = JSON.parse(file);

      await upsertTable(file);
    });
  });

  return true;
};

export default loadPlugins;
