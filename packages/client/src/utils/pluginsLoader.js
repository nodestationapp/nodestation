const core = [
  import("@nstation/auth/client/index.js"),
  import("@nstation/dashboard/client/index.js"),
  import("@nstation/tables/client/index.js"),
  import("@nstation/media/client/index.js"),
  import("@nstation/emails/client/index.js"),
];

import pluginLoader from "@nstation/config/plugin-imports.js";

export default async (app) => {
  try {
    const clientPlugins = pluginLoader?.plugins?.map(
      (plugin) => plugin?.client
    );

    const allAddons = [...core, ...clientPlugins];

    for await (const item of allAddons) {
      const plugin = await item;
      plugin.default.register(app);
    }

    return core;
  } catch (err) {
    console.error(err);
  }
};
