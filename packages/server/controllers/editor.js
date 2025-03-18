import path from "path";
import { promises as fs_promise } from "fs";
import { fs, rootPath } from "@nstation/utils";

import editorDefaultContent from "#libs/editorDefaultContent.js";

const getAllEditor = async (_, res) => {
  try {
    let endpoints = fs.getFiles("/src/endpoints/**/*");

    return res.status(200).json(endpoints);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const createEditor = async (req, res) => {
  const body = req?.body;

  const content = editorDefaultContent(body);

  try {
    const id = await fs.createFile({
      content,
      path: `${path.join(`/src`, body?.path)}.js`,
    });

    return res.status(200).json({ id, name: body?.name, type: body?.type });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

const updateEditor = async (req, res) => {
  const body = req?.body;

  try {
    const file_path = path.join(rootPath, `/src`, body?.path) + ".js";
    const file_content = await fs_promise.readFile(file_path, "utf8");
    if (!file_content) {
      throw new Error("File not found");
    }

    let content;
    if (body?.properties) {
      content = file_content;
      for (const [key, value] of Object.entries(body?.properties)) {
        if (value) {
          const regex = new RegExp(`@${key} .*`, "g");

          if (!content.match(regex)) {
            if (content.includes("*/")) {
              content = content.replace("*/", `* @${key} ${value}\n */`);
            } else {
              content = `/**\n * @${key} ${value}\n */\n\n${content}`;
            }
            continue;
          }

          if (Array.isArray(value)) {
            content = content.replace(regex, `@${key} [${value.join(", ")}]`);
          } else {
            content = content.replace(regex, `@${key} ${value}`);
          }
        }
      }
    }

    await fs.updateFile({
      content,
      path: `${path.join(`/src`, body?.path)}.js`,
      ...(body?.new_path && {
        new_path: `${path.join(`/src`, body?.new_path)}.js`,
      }),
    });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

const deleteEditor = async (req, res) => {
  const body = req?.body;

  try {
    await fs.deleteFile(`${path.join(`/src`, body?.path)}.js`);

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

export { getAllEditor, createEditor, updateEditor, deleteEditor };
