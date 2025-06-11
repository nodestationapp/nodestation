const core = [
  import("@nstation/auth/client/index.js"),
  import("@nstation/dashboard/client/index.js"),
  import("@nstation/tables/client/index.js"),
  import("@nstation/media/client/index.js"),
  import("@nstation/emails/client/index.js"),
];

export default async (app) => {
  try {
    // const context = require.context("plugins", true, /client\/index\.js$/);

    const configContext = require.context(
      "root",
      false,
      /nodestation-config\.js$/
    );
    const configModule =
      configContext.keys().length > 0
        ? configContext(configContext.keys()[0])
        : null;

    const pluginsFromConfig = configModule.default.plugins || {};

    console.log(pluginsFromConfig);

    for await (const item of core) {
      const plugin = await item;
      plugin.default.register(app);
    }

    // for await (const key of context.keys()) {
    //   const plugin = await context(key);
    //   plugin.default.register(app);
    //   core.push(plugin);
    // }

    for await (const pkgName of Object.keys(pluginsFromConfig)) {
      const plugin = await pluginsFromConfig[pkgName];
      plugin.default.register(app);
      core.push(plugin);
    }

    return core;
  } catch (err) {
    console.error(err);
  }
};
