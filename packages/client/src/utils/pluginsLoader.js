import logger from "@nstation/logger/client/index.js";
import auth from "@nstation/auth/client/index.js";
import dashboard from "@nstation/dashboard/client/index.js";
import tables from "@nstation/tables/client/index.js";
import media from "@nstation/media/client/index.js";
import emails from "@nstation/emails/client/index.js";
import fieldTypes from "@nstation/field-types/client/index.js";

import pluginLoader from "@nstation/config/plugin-imports.js";

export default (app) => {
  try {
    const allAddons = [
      logger,
      auth,
      dashboard,
      tables,
      media,
      emails,
      fieldTypes,
      ...pluginLoader?.plugins,
    ];

    for (const item of allAddons) {
      item.register(app);
    }

    return true;
  } catch (err) {
    console.error(err);
  }
};
