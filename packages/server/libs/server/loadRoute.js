import fs_sys from "fs";
import express from "express";

import { authMiddleware } from "@nstation/auth";

const loadRoute = async (server, route) => {
  if (!server.router) {
    server.router = new express.Router();
  }

  if (fs_sys.existsSync(route?.filePath)) {
    const { default: handler } = await import(route?.filePath);

    server.router[route?.name.toLowerCase()](
      `/api${route?.path}`,
      route?.properties?.parser === "raw"
        ? express.raw({ type: "application/json" })
        : express.json(),
      authMiddleware(route?.properties?.auth),
      handler
    );
  }
};

export default loadRoute;
