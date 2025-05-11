#!/usr/bin/env node

import "dotenv/config";
import createApp from "./utils/createApp.js";
import welcomeBox from "./utils/welcomeBox.js";

(async () => {
  // console.log(process.argv[2])
  const app = createApp();
  await app.init();

  app.express.listen(app.port, () => {
    welcomeBox({ port: app.port });
  });
})();
