import path from "path";
import { glob } from "glob";
import { promises as fs_promise } from "fs";
import { fs, rootPath } from "@nstation/utils";

import editorDefaultContent from "#libs/editorDefaultContent.js";

function buildTree(files) {
  const root = [];
  let id = 1;

  files.forEach((file) => {
    const parts = file.path.split("/").filter(Boolean); // Rozdziel ścieżkę na segmenty
    let currentLevel = root;

    parts.forEach((part, index) => {
      let existingNode = currentLevel.find((node) => node.name === part);

      if (!existingNode) {
        existingNode = {
          id,
          name: part,
          children: [],
        };

        if (index === parts.length - 1) {
          Object.assign(existingNode, file); // Jeśli to plik, dodaj jego dane
          delete existingNode.children; // Pliki nie mają children
        }

        currentLevel.push(existingNode);
      }

      currentLevel = existingNode.children || [];
      id++;
    });
  });

  return root;
}

const getAllEditor = async (_, res) => {
  try {
    let endpoints = fs.getFiles("/src/**/*");

    const newendpoint = buildTree(endpoints);

    return res.status(200).json(newendpoint);
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

          content = content.replace(regex, `@${key} ${value}`);
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

function traverseAndModifyMetadataGlob(pattern) {
  const modifiedStructure = [];

  const files = glob.sync(pattern);

  files.forEach((file) => {
    const item = fs.readFileSync(file, "utf8");
    let properties = {};

    if (item.metadata.type === "endpoints") {
      const path = item?.metadata?.path?.split("/");
      path.splice(0, 2);
      path.pop();

      item.metadata.method = item.name.replace(".js", "");
      item.name = `/${path?.join("/")}`;

      const propertyMatch = item?.metadata?.content?.match(/\* @(\w+) (.*)/g);
      if (propertyMatch) {
        propertyMatch.forEach((match) => {
          const [_, key, value] = match.match(/\* @(\w+) (.*)/);
          properties[key] = value === "[]" ? [] : value;
        });
      }

      item.metadata.properties = properties;
      delete item?.metadata?.content;
    }

    modifiedStructure.push(item);
  });

  return modifiedStructure;
}

export { getAllEditor, createEditor, updateEditor, deleteEditor };
