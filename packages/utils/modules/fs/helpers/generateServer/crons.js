import fs from "fs";
import path from "path";
import rootPath from "#modules/rootPath.js";

export default async ({ crons }) => {
  const cwd = path.join(rootPath, ".nodestation", "files");

  try {
    let crons_file = "";
    crons_file = `import cron from "node-cron";\n\n`;
    crons_file += `${crons
      ?.map(
        (item) =>
          `import ${item?.id} from "${path.join(cwd, `${item?.id}.js`)}";`
      )
      ?.join("\n")}`;
    crons_file += `${crons
      ?.map(
        (item) =>
          `cron.schedule("${item?.options?.schedule}", async () => {\nawait ${item?.id}()\n},\n{\ntimezone: "${item?.options?.timezone}"\n});\n\n`
      )
      ?.join("\n")}`;

    const current_path = path.join(cwd, "crons.js");
    fs.writeFileSync(current_path, crons_file);
  } catch (err) {
    console.error(err);
  }
};
