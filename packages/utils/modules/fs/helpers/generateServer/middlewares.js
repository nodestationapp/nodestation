import fs from "fs";
import path from "path";
import rootPath from "#modules/rootPath.js";

export default async ({ middlewares }) => {
  const cwd = path.join(rootPath, ".nodestation", "files");

  try {
    let middlewares_file = "";
    middlewares_file = `${middlewares
      ?.map(
        (item) =>
          `import ${item?.id} from "${path.join(cwd, `${item?.id}.js`)}"`
      )
      ?.join("\n")} \n\n`;

    middlewares_file += `export { ${middlewares?.map((item) => item?.id)} };`;

    const current_path = path.join(cwd, "middlewares.js");
    fs.writeFileSync(current_path, middlewares_file);
  } catch (err) {
    console.error(err);
  }
};
