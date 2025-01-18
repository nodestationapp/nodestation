import { fs } from "@nstation/utils";

const getAllEditor = async (_, res) => {
  try {
    let files = fs.getFiles(["endpoints", "crons", "helpers", "middlewares"]);

    return res.status(200).json({ editor: files });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const createEditor = async (req, res) => {
  const body = req?.body;

  try {
    const id = await fs.createFile(body);

    return res.status(200).json({ id, name: body?.name, type: body?.type });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

const updateEditor = async (req, res) => {
  const body = req?.body;
  const { id } = req?.params;

  try {
    await fs.updateFile(id, body);

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

const deleteEditor = async (req, res) => {
  const { id } = req?.params;

  try {
    await fs.deleteFile(id);

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

export { getAllEditor, createEditor, updateEditor, deleteEditor };
