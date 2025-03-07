#!/usr/bin/env node

import * as esbuild from "esbuild";

const builder = () => {
  esbuild
    .build({
      entryPoints: ["./packages/server/index.js"],
      outdir: "./build",
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
