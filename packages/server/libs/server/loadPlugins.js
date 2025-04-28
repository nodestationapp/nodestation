import path from "path";
import fs_sys from "fs";
import glob from "glob";
import { upsertTable } from "@nstation/db";
import { rootPath } from "@nstation/utils";

import loadRoute from "./loadRoute.js";

const core = [
  "@nstation/core/auth/server",
  "@nstation/core/media/server",
  "@nstation/core/tables/server",
];

const loadPlugins = (router) => {
  core.forEach(async (plugin) => {
    //ROUTES
    const { default: routes } = await import(`${plugin}/api/index.js`);
    await loadRoute(router, routes);

    //SCHEMAS
    let resolved = import.meta.resolve(plugin);
    resolved = resolved.replace(/^file:\/*/, "/");

    const schemas = glob.sync(path.join(resolved, "schemas", "*.json"), {
      nodir: true,
    });

    schemas.forEach(async (schema) => {
      const index = schema.indexOf("/schemas");
      const result = schema.substring(index);

      const file_exists = fs_sys.existsSync(path.join(rootPath, "src", result));

      let file;

      if (!!file_exists) {
        file = fs_sys.readFileSync(path.join(rootPath, "src", result), "utf-8");
        file = JSON.parse(file);
      } else {
        file = fs_sys.readFileSync(schema, "utf-8");
        file = JSON.parse(file);
      }

      await upsertTable(file);
    });
  });

  return true;
};

export default loadPlugins;
