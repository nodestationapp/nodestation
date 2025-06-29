import fs from "fs";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import loadPlugins from "./loadPlugins.js";
import { rootPath, cors } from "@nstation/utils";
import { logger } from "@nstation/logger";

const clientPath = path.join(rootPath, "build");

function createApp() {
  const expressApp = express();
  const router = express.Router();

  const app = {
    router,
    express: expressApp,
    port: process.env.PORT,
  };

  app.init = async () => {
    app.express.set("trust proxy", "127.0.0.1");

    // app.express.use((req, res, next) => {
    //   const originalSend = res.send;

    //   res.send = function (body) {
    //     res.locals.responseBody = body;
    //     return originalSend.call(this, body);
    //   };

    //   next();
    // });

    app.express.use(cors);
    app.express.use(logger);
    app.express.use(bodyParser.urlencoded({ extended: true }));
    app.express.use((req, res, next) => {
      app.router(req, res, next);
    });

    // io({ server: app.server, app: app.express });

    app.express.use("/", express.static(path.join(rootPath, "public")));
    app.express.use(
      "/uploads",
      express.static(path.join(rootPath, "public", "uploads"))
    );
    await loadPlugins(app.router);

    app.express.use("/api", (_, res) => {
      res.status(404).json({ error: "Not found" });
    });
    app.express.use("/admin-api", (_, res) => {
      res.status(404).json({ error: "Not found" });
    });

    //FRONTEND
    if (
      fs.existsSync(clientPath) &&
      fs.existsSync(path.join(clientPath, "index.html"))
    ) {
      app.express.use(express.static(clientPath));
      app.express.get("*", (_, res) => {
        res.sendFile(path.join(clientPath, "index.html"));
      });
    }
  };

  return app;
}

export default createApp;
