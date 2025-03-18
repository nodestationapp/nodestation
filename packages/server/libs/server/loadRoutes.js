import path from "path";
import fs_sys from "fs";
import express from "express";

import { fs, rootPath } from "@nstation/utils";
import { authMiddleware } from "@nstation/auth";

const loadRoutes = (server) => {
  const newRouter = new express.Router();
  const files = fs.getFiles(["/src/endpoints/**/*.js"]);
  const activeFiles = files?.filter(
    (item) => item?.properties?.status === "active"
  );

  if (activeFiles?.length > 0) {
    activeFiles.forEach(async (item) => {
      try {
        const filePath = path.join(
          rootPath,
          "src",
          "endpoints",
          item?.path,
          `${item?.name}.js`
        );
        // const middlewaresPath = path.join(
        //   rootPath,
        //   ".nodestation",
        //   "files",
        //   "middlewares.js"
        // );

        if (fs_sys.existsSync(filePath)) {
          const { default: handler } = await import(filePath);
          // const middlewares = fs_sys.existsSync(middlewaresPath)
          //   ? await import(middlewaresPath)
          //   : [];

          newRouter[item?.name.toLowerCase()](
            `/api${item?.path}`,
            item?.properties?.parser === "raw"
              ? express.raw({ type: "application/json" })
              : express.json(),
            authMiddleware(item?.properties?.auth),
            // item?.properties?.middlewares?.map((item) => middlewares?.[item]) ||
            //   [],
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
