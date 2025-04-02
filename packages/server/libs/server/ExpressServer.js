import path from "path";
import http from "http";
import fs_sys from "fs";
import express from "express";
import bodyParser from "body-parser";
import { rootPath, cors, io, logger } from "@nstation/utils";

import apiRoutes from "#routes/api.js";
import allRoutes from "#routes/index.js";
import loadPlugins from "#libs/server/loadPlugins.js";
import cronsImport from "#libs/server/cronsImport.js";

cronsImport();

class ExpressServer {
  constructor(config = {}) {
    this.loadPlugins = loadPlugins.bind(null, this);

    this.app = express();
    this.app.set("trust proxy", "127.0.0.1");
    this.port = config.port || 3000;
    this.router = new express.Router();
    this.server = http.createServer(this.app);

    io({ server: this.server, app: this.app });

    // MIDDLEWARES
    this.app.use(cors);
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use(logger);

    //ROUTES
    this.app.use((req, res, next) => {
      this.router(req, res, next);
    });

    this.app.use("/api", express.json(), apiRoutes);
    this.app.use("/admin/api", express.json(), allRoutes);
    this.app.use("/uploads", express.static(path.join(rootPath, "uploads")));

    this.loadPlugins();

    const clientPath = path.join(
      rootPath,
      "node_modules",
      "@nstation",
      "client",
      "dist"
    );

    if (
      fs_sys.existsSync(clientPath) &&
      fs_sys.existsSync(path.join(clientPath, "index.html"))
    ) {
      //FRONTEND
      this.app.use(express.static(clientPath));
      this.app.get("*", (_, res) => {
        res.sendFile(path.join(clientPath, "index.html"));
      });
    }
  }

  start() {
    this.server.listen(this.port);
  }

  close() {
    this.server.close();
  }
}

export default ExpressServer;
