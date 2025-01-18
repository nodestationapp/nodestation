#!/usr/bin/env node

import { createServer } from "../utils/modules/cli/index.js";

if (process.argv[2] === "start") {
  (async () => {
    try {
      await createServer();
    } catch (err) {
      console.error(err);
    }
  })();
}
