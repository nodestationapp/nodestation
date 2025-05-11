import fs from "fs";
import path from "path";

import chalk from "chalk";
import boxen from "boxen";
import { rootPath } from "@nstation/utils";

const welcomeBox = async ({ executionTime, port }) => {
  const packagePath = path.join(rootPath, "package.json");
  const fileContent = fs.readFileSync(packagePath, "utf-8");
  const packageJson = JSON.parse(fileContent);

  const message = `${chalk.bold.green("🚀 Nodestation is live!")}
  
  ${chalk.underline("Server Information")}
  ${chalk.yellow("Database:")}             ${process.env.DATABASE_CLIENT}
  ${chalk.yellow("App Version:")}          ${packageJson?.version}
  
  ${chalk.underline("Access Link")}
  ${chalk.cyan("Server URL:")}           http://localhost:${port}`;

  const boxedMessage = boxen(message, {
    padding: 1,
    margin: 0,
    borderStyle: "round",
    borderColor: "green",
  });

  console.info(boxedMessage);
};

export default welcomeBox;
