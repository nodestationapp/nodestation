import fs from "fs";
import path from "path";

import { createSchema } from "./packages/db/index.js";
import { rootPath } from "./packages/utils/index.js";

const setup = async () => {
  const databasePath = path.join(rootPath, ".db-test");
  if (fs.existsSync(databasePath)) {
    fs.rmSync(databasePath, { recursive: true, force: true });
  }

  await createSchema();
};

export default setup;
