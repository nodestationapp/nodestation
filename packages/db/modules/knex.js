import pg from "pg";
import path from "path";
import knex from "knex";

import rootPath from "../../utils/modules/rootPath.js";

if (process?.env?.DATABASE_CLIENT === "postgresql") {
  pg.types.setTypeParser(20, (val) => {
    return parseInt(val, 10);
  });
}

const clientConfigProvider = () => {
  switch (process?.env?.DATABASE_CLIENT) {
    case "sqlite":
      return {
        client: "better-sqlite3",
        connection: {
          filename: path.join(rootPath, process?.env?.DATABASE_PATH),
        },
      };
    case "postgresql":
      return {
        client: "pg",
        connection: process?.env?.DATABASE_PATH,
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
