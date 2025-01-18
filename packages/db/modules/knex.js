import path from "path";
import knex from "knex";
import rootPath from "../../utils/modules/rootPath.js";

const clientConfigProvider = () => {
  switch (process?.env?.DATABASE_CLIENT) {
    case "sqlite":
      return {
        client: "better-sqlite3",
        connection: {
          filename: path.join(rootPath, process?.env?.DATABASE_FILENAME),
        },
      };
    default:
      return null;
  }
};

const clientConfig = clientConfigProvider();

const db = !!process.env.DATABASE_CLIENT
  ? knex({
      ...clientConfig,
      useNullAsDefault: true,
    })
  : null;

export default db || null;
