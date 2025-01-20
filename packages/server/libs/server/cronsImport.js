import path from "path";
import fs_sys from "fs";
import { rootPath } from "@nstation/utils";

const cronsImport = async () => {
  const cronsPath = path.join(rootPath, ".nodestation", "files", "crons.js");

  if (fs_sys.existsSync(cronsPath)) {
    await import(cronsPath);
  }
};

export default cronsImport;
