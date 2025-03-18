import fs from "fs";
import path from "path";

import chalk from "chalk";
import boxen from "boxen";
import cli from "#modules/cli/index.js";
import rootPath from "#modules/rootPath.js";

const welcomeBox = async ({ executionTime }) => {
  const packagePath = path.join(rootPath, "package.json");
  const fileContent = fs.readFileSync(packagePath, "utf-8");
  const packageJson = JSON.parse(fileContent);

  const message = `${chalk.bold.green("🚀 Nodestation is live!")}

${chalk.underline("Server Information")}
${chalk.yellow("Startup Time:")}         ${executionTime} ms
${chalk.yellow("Database:")}             ${process.env.DATABASE_CLIENT}
${chalk.yellow("App Version:")}          ${packageJson?.version}

${chalk.underline("Access Link")}
${chalk.cyan("Server URL:")}           http://localhost:${process.env.PORT}`;

  const boxedMessage = boxen(message, {
    padding: 1,
    margin: 0,
    borderStyle: "round",
    borderColor: "green",
  });

  console.info(boxedMessage);
};

// TODO: add documentation

// ${chalk.underline("Documentation:")}
// ${chalk.cyan("https://docs.example.com")}`;

export default async (timeStart, type) => {
  try {
    let cwd;

    if (type === "dev") {
      cwd = path.join(rootPath, "node_modules", "@nstation", "server");

      cli.runCommand({
        cmd: "nodemon",
        args: [
          "--watch",
          path.join(rootPath, ".nodestation"),
          "--delay",
          "10ms",
          "--quiet",
          "index.js",
        ],
        __dirname: cwd,
      });

      cli.runCommand({
        cmd: "npm",
        args: [
          "--prefix",
          path.join("node_modules", "@nstation", "client"),
          "start",
        ],
        __dirname: rootPath,
      });
    } else {
      cwd = path.join(rootPath, "build");

      cli.runCommand({
        cmd: "node",
        args: ["index.js"],
        __dirname: cwd,
      });
    }

    const timeEnd = new Date();
    const executionTime = timeEnd - timeStart;

    await welcomeBox({ executionTime: executionTime });
  } catch (error) {
    console.error(`${error}`);
  }
};
