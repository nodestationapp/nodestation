#!/usr/bin/env node

import createApp from "./utils/createApp.js";
import welcomeBox from "./utils/welcomeBox.js";

const entry = async () => {
  const app = createApp();
  await app.init();

  app.express.listen(app.port, () => {
    welcomeBox({ port: app.port });
  });
};

entry();

export default entry;
