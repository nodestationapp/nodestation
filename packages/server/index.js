import "dotenv/config";
import createApp from "./utils/createApp.js";

(async () => {
  const app = createApp();
  await app.init();

  app.express.listen(app.port, () => {
    app.log(`Serwer działa na http://localhost:${app.port}`);
  });
})();
