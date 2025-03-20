#!/usr/bin/env node

import entry from "./entry.js";
import builder from "./build.js";

if (process.argv[2] === "build") {
  builder();
}

if (process.argv[2] === "start" || process.argv[2] === "dev") {
  entry(process.argv[2], process.argv[3]);
}
