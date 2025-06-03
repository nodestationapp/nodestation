#!/usr/bin/env node

import "dotenv/config";

import path from "path";
import { rootPath, runCommand } from "@nstation/utils";

if (process.argv[2] === "dev") {
  const cwd = path.join(rootPath, "node_modules", "nodestation");

  runCommand({
    cmd: "nodemon",
    args: ["--watch", rootPath, "--quiet", "entry.js"],
    __dirname: cwd,
  });
}
