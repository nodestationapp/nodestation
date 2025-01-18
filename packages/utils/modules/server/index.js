import ora from "ora";
import { createSchema } from "@nstation/db";

import start from "./helpers/start.js";
import buildingServer from "./helpers/buildingServer/index.js";

const create = async () => {
  try {
    if (!process?.env?.PORT) {
      console.info(
        `Error: The environment variable PORT is not set.\nRefer to the documentation for supported database clients.`
      );
      process.exit(1);
    }

    if (!process?.env?.DATABASE_CLIENT) {
      console.info(
        `Error: The environment variable DATABASE_CLIENT is not set.\nRefer to the documentation for supported database clients.`
      );
      process.exit(1);
    }

    if (!process?.env?.PUBLIC_URL) {
      console.info(
        `Error: The environment variable PUBLIC_URL is not set.\nRefer to the documentation for supported database clients.`
      );
      process.exit(1);
    }

    if (!process?.env?.TOKEN_SECRET) {
      console.info(
        `Error: The environment variable TOKEN_SECRET is not set.\nRefer to the documentation for supported database clients.`
      );
      process.exit(1);
    }

    let spinner;
    spinner = ora(`Building server`).start();

    await createSchema();
    await buildingServer();

    spinner.succeed("Building server");
  } catch (err) {
    console.error(err);
  }
};

export default { create, buildingServer, start };
