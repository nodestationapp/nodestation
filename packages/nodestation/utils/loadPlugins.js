import path from "path";
import fs_sys from "fs";
import { glob } from "glob";
import { upsertTable } from "@nstation/db";
import { rootPath } from "@nstation/utils";

import loadRoute from "./loadRoute.js";

const core = [
  "@nstation/core/auth/server",
  "@nstation/core/media/server",
  "@nstation/core/tables/server",
  "@nstation/core/emails/server",
];

const loadPlugins = async (router) => {
  for await (const plugin of core) {
    //ROUTES
    const { default: routes } = await import(`${plugin}/api/index.js`);
    await loadRoute(router, routes);

    //SCHEMAS
    let resolved = import.meta.resolve(plugin);
    resolved = resolved.replace(/^file:\/*/, "/");

    const schemas = glob.sync(path.join(resolved, "schemas", "*.json"), {
      nodir: true,
    });

    for await (const schema of schemas) {
      const index = schema.indexOf("/schemas");
      const result = schema.substring(index);

      const isExtenstion = fs_sys.existsSync(
        path.join(rootPath, "src", "extensions", result)
      );

      let file;

      if (!!isExtenstion) {
        file = fs_sys.readFileSync(
          path.join(rootPath, "src", "extensions", result),
          "utf-8"
        );
        file = JSON.parse(file);
      } else {
        file = fs_sys.readFileSync(schema, "utf-8");
        file = JSON.parse(file);
      }

      await upsertTable(file);
    }
  }

  return true;
};

export default loadPlugins;
