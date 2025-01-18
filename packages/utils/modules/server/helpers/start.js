import path from "path";
import rootPath from "#modules/rootPath.js";
import cli from "#modules/cli/index.js";

const welcomeBox = async ({ executionTime }) => {
  const chalk = (await import("chalk")).default;
  const boxen = (await import("boxen")).default;

  const message = `${chalk.bold.green("🚀 Nodestation is live!")}

${chalk.underline("Server Information")}
${chalk.yellow("Startup Time:")}         ${executionTime} ms

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

// ${chalk.yellow("Database:")}             Postgresql
// ${chalk.yellow("App Version:")}          1.0.0

// ${chalk.underline("Documentation:")}
// ${chalk.cyan("https://docs.example.com")}`;

export default async (timeStart) => {
  try {
    const cwd = path.join(rootPath, "node_modules", "@nstation", "server");

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

    const timeEnd = new Date();
    const executionTime = timeEnd - timeStart;

    await welcomeBox({ executionTime: executionTime });
  } catch (error) {
    console.error(`${error}`);
  }
};
