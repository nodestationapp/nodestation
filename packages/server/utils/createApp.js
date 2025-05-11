import fs from "fs";
import http from "http";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import loadPlugins from "./loadPlugins.js";
import { rootPath, cors, logger } from "@nstation/utils";

const clientPath = path.join(
  rootPath,
  "node_modules",
  "@nstation",
  "client",
  "dist"
);

function createApp() {
  const expressApp = express();
  const router = express.Router();

  const app = {
    router,
    plugins: {},
    express: expressApp,
    port: process.env.PORT,
    server: http.createServer(expressApp),
    log: (...args) => console.log("[APP]", ...args),
  };

  app.init = async () => {
    app.express.set("trust proxy", "127.0.0.1");

    app.express.use(cors);
    app.express.use(logger);
    app.express.use(bodyParser.urlencoded({ extended: true }));
    app.express.use((req, res, next) => {
      app.router(req, res, next);
    });

    // io({ server: app.server, app: app.express });

    loadPlugins(app.router);

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
