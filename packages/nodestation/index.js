#!/usr/bin/env node

import "dotenv/config";

import path from "path";
import { rootPath, runCommand } from "@nstation/utils";

if (process.argv[2] === "dev") {
  const client_cwd = path.join(rootPath, "node_modules", "@nstation", "client");
  const server_cwd = path.join(rootPath, "node_modules", "nodestation");

  runCommand({
    cmd: "npm",
    args: ["start"],
    __dirname: client_cwd,
    env: {
      ROOT_DIR: rootPath,
    },
  });

  runCommand({
    cmd: "nodemon",
    args: [
      "--watch",
      rootPath,
      "--ignore",
      "**/client/**",
      "--ignore",
      "**/design-system/**",
      "--quiet",
      "entry.js",
    ],
    __dirname: server_cwd,
  });
}

if (process.argv[2] === "start") {
  const server_cwd = path.join(rootPath, "node_modules", "nodestation");

  runCommand({
    cmd: "nodemon",
    args: ["--watch", rootPath, "--quiet", "entry.js"],
    __dirname: server_cwd,
  });
}

if (process.argv[2] === "build") {
  const client_cwd = path.join(rootPath, "node_modules", "@nstation", "client");

  runCommand({
    cmd: "npm",
    args: ["run", "build"],
    __dirname: client_cwd,
    env: {
      ROOT_DIR: rootPath,
    },
  });
}
