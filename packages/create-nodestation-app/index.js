#!/usr/bin/env node

import ora from "ora";
import path from "path";
import fs_sys from "fs";
import crypto from "crypto";
import inquirer from "inquirer";
import { cli } from "@nstation/utils";
import { promises as fs_promise } from "fs";

import authSchema from "./templates/authSchema.json" assert { type: "json" };

(async () => {
  try {
    const choices = [
      {
        name: "SQLite",
        value: { provider: "sqlite", url: ".db/data.sqlite3" },
      },
      {
        name: "PostgreSQL",
        value: {
          provider: "postgresql",
          url: "postgresql://postgres:admin@127.0.0.1:5432/nstation",
        },
      },
    ];

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Project name:",
      },
      {
        type: "list",
        name: "provider",
        message: "Select the database type:",
        choices,
      },
      {
        type: "input",
        name: "url",
        message: "Provide the database connection URL:",
        default: (answers) => answers?.provider?.url,
        when: (answers) => answers.provider !== undefined,
      },
    ]);

    const packageJson = {
      name: answers?.name,
      version: "0.1.0",
      type: "module",
      scripts: {
        start: "nodestation start",
      },
      dependencies: {
        nodestation: "1.3.0",
      },
    };

    const envJson = {
      PORT: 3000,
      DATABASE_CLIENT: "sqlite",
      PUBLIC_URL: "http://localhost:3000",
      DATABASE_PATH: answers?.provider?.url,
      TOKEN_SECRET: crypto.randomBytes(64).toString("hex"),
    };

    const envString = Object.entries(envJson)
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");

    const projectPath = path.resolve(answers.name);

    if (!fs_sys.existsSync(projectPath)) {
      await fs_promise.mkdir(projectPath, { recursive: true });
    }

    await fs_promise.writeFile(path.join(projectPath, ".env"), envString);

    await fs_promise.writeFile(
      path.join(projectPath, "package.json"),
      JSON.stringify(packageJson, null, 2)
    );

    await fs_promise.mkdir(path.join(projectPath, "src"), { recursive: true });
    await fs_promise.writeFile(
      path.join(projectPath, "src", "auth.json"),
      JSON.stringify(authSchema, null, 2)
    );

    let spinner;
    spinner = ora(`Installing dependencies`).start();

    await cli.runCommand({
      cmd: "npm",
      args: ["i"],
      __dirname: projectPath,
    });

    spinner.succeed("Installing dependencies");
  } catch (err) {
    console.error(err);
  }
})();
