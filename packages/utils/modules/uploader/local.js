import fs from "fs";
import path from "path";
import multer from "multer";
import rootPath from "#modules/rootPath.js";

let upload_folder = path.join(rootPath, "uploads");

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    const current_date = Date.now();
    const current_path = path.join(upload_folder, `${current_date}`);

    if (!fs.existsSync(current_path)) {
      fs.mkdirSync(current_path, { recursive: true });
    }

    cb(null, current_path);
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname);
  },
});

const local = () => multer({ storage }).any();

export default local;
