#!/usr/bin/env node

import ora from "ora";
import path from "path";
import fs_sys from "fs";
import boxen from "boxen";
import chalk from "chalk";
import crypto from "crypto";
import figlet from "figlet";
import inquirer from "inquirer";
import { cli } from "@nstation/utils";
import { promises as fs_promise } from "fs";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const authSchema = JSON.parse(
  fs_sys.readFileSync(
    path.join(__dirname, "/templates/authSchema.json"),
    "utf-8"
  )
);

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
    await fs_promise.mkdir(path.join(projectPath, "schemas"), {
      recursive: true,
    });
    await fs_promise.writeFile(
      path.join(projectPath, "schemas", "auth.json"),
      JSON.stringify(authSchema, null, 2)
    );
    let spinner;
    spinner = ora(`Installing dependencies`).start();
    await cli.runCommand({
      cmd: "npm",
      args: ["i", "nodestation@latest", "--loglevel", "error"],
      __dirname: projectPath,
    });
    spinner.succeed("Installing dependencies");

    const nodestationText = await figlet("Nodestation");

    console.info(nodestationText);

    const message = `Success! Your project ${chalk.green(
      answers?.name
    )} is ready to go.

To get started, run:

${chalk.cyan("cd")} ${answers?.name}
${chalk.cyan("npm start")}

${chalk.magenta("Happy coding!")}`;

    const boxedMessage = boxen(message, {
      padding: 1,
      margin: 0,
      borderStyle: "round",
      borderColor: "green",
    });

    console.info(boxedMessage);
  } catch (err) {
    console.error(err);
  }
})();
