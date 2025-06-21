import path from "path";
import fs_sys from "fs";
import { glob } from "glob";
import { upsertTable } from "@nstation/db";
import { rootPath } from "@nstation/utils";
import requireFromString from "require-from-string";

import loadRoute from "./loadRoute.js";
import { addFieldTypes } from "./loadFieldType.js";

let core = [
  {
    name: "@nstation/field-types/server",
    type: "system",
  },
  {
    name: "@nstation/auth/server",
    type: "system",
  },
  {
    name: "@nstation/media/server",
    type: "system",
  },
  {
    name: "@nstation/tables/server",
    type: "system",
  },
  {
    name: "@nstation/emails/server",
    type: "system",
  },
  {
    name: "@nstation/logger/server",
    type: "system",
  },
];

const app = {
  addFieldTypes: (fieldTypes) => addFieldTypes(fieldTypes),
};

const loadPlugins = async (router) => {
  let config = fs_sys.readFileSync(
    path.join(rootPath, "nodestation.config.js"),
    "utf-8"
  );

  const parsedConfig = requireFromString(config);

  const plugins = parsedConfig.plugins.map((plugin) => {
    const resolve = plugin.resolve || plugin;

    if (resolve.startsWith("./")) {
      plugin = resolve.replace("./", `${rootPath}/`);
    }

    return plugin;
  });

  const tables = glob.sync(path.join(rootPath, "src", "tables", "*/"));

  core.push(
    ...plugins?.map((plugin) => ({
      name: `${plugin}/server`,
      type: "plugin",
    })),
    ...tables?.map((table) => ({
      name: table,
      type: "plugin",
    }))
  );

  for await (const plugin of core) {
    const isServerFile = fs_sys.existsSync(
      path.join(rootPath, "node_modules", plugin?.name, "index.js")
    );

    if (isServerFile) {
      const { default: server } = await import(`${plugin?.name}/index.js`);
      server.register(app);
    }

    //ROUTES
    const { default: routes } = await import(`${plugin?.name}/api/index.js`);
    await loadRoute(router, routes, plugin?.type);

    //SCHEMAS
    let resolved = import.meta.resolve(plugin?.name);
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
    path.join(rootPath, "src", "tables", "**", "schemas", "*.json"),
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
