import fs from "fs";
import path from "path";

import { rootPath } from "./packages/utils/index.js";

const setup = async () => {
  if (process.env.DATABASE_CLIENT === "sqlite") {
    const dir = path.dirname(process.env.DATABASE_PATH);
    const databasePath = path.join(rootPath, dir);
    if (fs.existsSync(databasePath)) {
      fs.rmSync(databasePath, { recursive: true, force: true });
    }
  }
};

export default setup;
