import path from "path";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import { rootPath, cors, io } from "@nstation/utils";

import apiRoutes from "#routes/api.js";
import allRoutes from "#routes/index.js";
import loadRoutes from "#libs/server/loadRoutes.js";
import logListener from "#libs/logListener.js";

import(path.join(rootPath, ".nodestation", "files", "crons.js"));

class ExpressServer {
  constructor(config = {}) {
    this.loadRoutes = loadRoutes.bind(null, this);

    this.app = express();
    this.port = config.port || 3000;
    this.router = new express.Router();
    this.server = http.createServer(this.app);

    io({ server: this.server, app: this.app });

    logListener({ app: this.app });

    // MIDDLEWARES
    this.app.use(cors);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    //ROUTES
    this.app.use((req, res, next) => {
      this.router(req, res, next);
    });

    this.app.use("/api", apiRoutes);
    this.app.use("/admin/api", allRoutes);
    this.app.use("/uploads", express.static(path.join(rootPath, "uploads")));

    this.loadRoutes();

    //FRONTEND
    this.app.use(
      express.static(
        path.join(rootPath, "node_modules", "@nstation", "client", "dist")
      )
    );
    this.app.get("*", (_, res) => {
      res.sendFile(
        path.join(
          rootPath,
          "node_modules",
          "@nstation",
          "client",
          "dist",
          "index.html"
        )
      );
    });
  }

  start() {
    this.server.listen(this.port);
  }
}

export default ExpressServer;
