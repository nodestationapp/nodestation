import "dotenv/config";

import knex from "../packages/db/modules/knex";
import ExpressServer from "../packages/server/libs/server/ExpressServer";

const app = new ExpressServer({ port: 3000 }).server;

const user = {
  first_name: "Nodestation",
  last_name: "Test",
  email: "test@nodestation.app",
  password: "qwerty12345",
};

export { app, user, knex };
