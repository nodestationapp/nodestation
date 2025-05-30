import path from "path";
import fs_sys from "fs";
import { glob } from "glob";
import { upsertTable } from "@nstation/db";
import { rootPath } from "@nstation/utils";

import loadRoute from "./loadRoute.js";

let core = [
  "@nstation/auth/server",
  "@nstation/media/server",
  "@nstation/tables/server",
  "@nstation/emails/server",
];

const loadPlugins = async (router) => {
  const plugins = glob.sync(path.join(rootPath, "plugins", "**", "server"));
  core.push(...plugins);

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

  const table_schemas = glob.sync(
    path.join(rootPath, "src", "tables", "*.json"),
    {
      nodir: true,
    }
  );

  for await (const schema of table_schemas) {
    let file = fs_sys.readFileSync(schema, "utf-8");
    file = JSON.parse(file);

    await upsertTable(file);
  }

  return true;
};

export default loadPlugins;
