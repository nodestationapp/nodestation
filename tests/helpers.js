import "dotenv/config";

import { beforeEach, afterEach } from "vitest";

import knex from "../packages/db/modules/knex";
import ExpressServer from "../packages/server/libs/server/ExpressServer";

let app;

const user = {
  first_name: "Nodestation",
  last_name: "Test",
  email: "test@nodestation.app",
  password: "qwerty12345",
};

beforeEach(async () => {
  app = new ExpressServer({ port: 3000 }).server;
});

afterEach(async () => {
  delete require.cache[
    require.resolve("../packages/server/libs/server/ExpressServer")
  ];
  await new Promise((resolve) => setTimeout(resolve, 100));
});

export { app, user, knex };
