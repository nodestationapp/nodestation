#!/usr/bin/env node

import path from "path";
import * as esbuild from "esbuild";
import { rootPath } from "@nstation/utils";

const builder = () => {
  esbuild
    .build({
      entryPoints: [
        path.join(rootPath, "node_modules", "@nstation", "server", "index.js"),
      ],
      outdir: path.join(rootPath, "build"),
      platform: "node",
      minify: true,
      bundle: true,
      format: "esm",
      sourcemap: false,
      treeShaking: true,
      packages: "external",
    })
    .then(() => {
      console.info("Build completed successfully! ✨");
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

export default builder;
