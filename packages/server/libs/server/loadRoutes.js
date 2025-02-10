import path from "path";
import fs_sys from "fs";
import express from "express";
import { fs, rootPath } from "@nstation/utils";
import { authMiddleware } from "@nstation/auth";

const loadRoutes = (server) => {
  const newRouter = new express.Router();
  const files = fs.getFiles(["endpoints"]);
  const activeFiles = files?.filter((item) => item?.status === "active");

  if (activeFiles?.length > 0) {
    activeFiles.forEach(async (item) => {
      try {
        const filePath = path.join(
          rootPath,
          ".nodestation",
          "files",
          `${item?.id}.js`
        );
        const middlewaresPath = path.join(
          rootPath,
          ".nodestation",
          "files",
          "middlewares.js"
        );

        if (fs_sys.existsSync(filePath)) {
          const { default: handler } = await import(filePath);
          const middlewares = fs_sys.existsSync(middlewaresPath)
            ? await import(middlewaresPath)
            : [];

          newRouter[item?.options?.method.toLowerCase()](
            `/api${item?.name}`,
            authMiddleware(item?.options?.auth),
            item?.options?.middlewares?.map((item) => middlewares?.[item]) ||
              [],
            handler
          );
        }
      } catch (err) {
        console.error(`Failed to load route ${item?.name}:`, err);
      }
    });
  }

  server.router = newRouter;
};

export default loadRoutes;
