#!/usr/bin/env node

import "dotenv/config";
import createApp from "./utils/createApp.js";
import welcomeBox from "./utils/welcomeBox.js";

(async () => {
  const app = createApp();
  await app.init();

  app.express.listen(app.port, () => {
    welcomeBox({ port: app.port });
  });
})();
