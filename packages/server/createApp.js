import fs from "fs";
import http from "http";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import loadPlugins from "./libs/server/loadPlugins.js";
import { rootPath, cors, logger, io } from "@nstation/utils";

import allRoutes from "#routes/index.js";

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

    app.express.use("/admin/api", express.json(), allRoutes);

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

  //   app.loadPlugins = () => {
  //     const pluginDir = path.join(__dirname, 'plugins');
  //     const plugins = fs.readdirSync(pluginDir);

  //     for (const name of plugins) {
  //       const pluginPath = path.join(pluginDir, name);
  //       const plugin = require(path.join(pluginPath, 'index.js'));

  //       app.plugins[name] = plugin;

  //       // register
  //       if (typeof plugin.register === 'function') {
  //         plugin.register({ app });
  //       }
  //     }
  //   };

  //   app.bootstrapPlugins = async () => {
  //     for (const name in app.plugins) {
  //       const plugin = app.plugins[name];
  //       if (typeof plugin.bootstrap === 'function') {
  //         await plugin.bootstrap({ app });
  //       }
  //     }
  //   };

  //   app.initPlugins = async () => {
  //     for (const name in app.plugins) {
  //       const plugin = app.plugins[name];
  //       if (typeof plugin.init === 'function') {
  //         await plugin.init({ app });
  //       }
  //     }
  //   };

  //   app.mountRoutes = () => {
  //     for (const { method, path, handler } of app.routes) {
  //       expressApp[method](path, handler);
  //       app.log(`Route mounted: [${method.toUpperCase()}] ${path}`);
  //     }
  //   };

  return app;
}

export default createApp;
