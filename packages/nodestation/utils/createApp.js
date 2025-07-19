import fs from "fs";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import { logger } from "@nstation/logger";
import loadPlugins from "./loadPlugins.js";
import { rootPath, cors } from "@nstation/utils";

import initRoute from "./system-routes/init.js";
import healthRoute from "./system-routes/health.js";

import { addFieldTypes } from "./loadFieldType.js";

const clientPath = path.join(rootPath, "build");

function createApp() {
  const expressApp = express();
  const router = express.Router();

  const app = {
    router,
    express: expressApp,
    port: process.env.PORT,
    addFieldTypes: (fieldTypes) => addFieldTypes(fieldTypes),
  };

  app.init = async () => {
    app.express.set("trust proxy", "127.0.0.1");

    app.express.use(cors);
    app.express.use(logger);
    app.express.use(bodyParser.urlencoded({ extended: true }));

    app.express.use((req, res, next) => {
      app.router(req, res, next);
    });

    app.express.get("/admin-api/init", initRoute);
    app.express.get("/admin-api/health", healthRoute);

    // io({ server: app.server, app: app.express });

    app.express.use("/", express.static(path.join(rootPath, "public")));
    app.express.use(
      "/uploads",
      express.static(path.join(rootPath, "public", "uploads"))
    );
    await loadPlugins(app);

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
