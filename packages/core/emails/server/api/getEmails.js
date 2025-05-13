import fs from "fs";
import path from "path";
import { glob } from "glob";
import { rootPath } from "@nstation/utils";

export default async (req, res) => {
  try {
    const emailFiles = glob.sync(
      path.join(rootPath, "src", "emails", "*.json")
    );

    let emails = [];

    for (const file of emailFiles) {
      const email = JSON.parse(fs.readFileSync(file, "utf8"));
      emails.push(email);
    }

    return res.status(200).json(emails);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
