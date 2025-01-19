import path from "path";
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

        const { default: handler } = await import(filePath);
        const middlewares = await import(
          path.join(rootPath, ".nodestation", "files", "middlewares.js")
        );

        newRouter[item?.options?.method.toLowerCase()](
          `/api${item?.name}`,
          authMiddleware(item?.options?.auth),
          item?.options?.middlewares?.map((item) => middlewares?.[item]),
          handler
        );
      } catch (err) {
        console.error(`Failed to load route ${item?.name}:`, err);
      }
    });
  }

  server.router = newRouter;
};

export default loadRoutes;
