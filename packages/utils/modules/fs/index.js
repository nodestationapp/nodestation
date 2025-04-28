import getFiles from "./helpers/getFiles.js";
import getSchema from "./helpers/getSchema.js";
import updateFile from "./helpers/updateFile.js";
import createFile from "./helpers/createFile.js";
import deleteFile from "./helpers/deleteFile.js";
import getPluginFiles from "./helpers/getPluginFiles.js";
import generateServer from "./helpers/generateServer/index.js";
import removeUploadedFile from "./helpers/utils/removeUploadedFile/index.js";

export default {
  getFiles,
  getSchema,
  createFile,
  updateFile,
  deleteFile,
  generateServer,
  getPluginFiles,
  removeUploadedFile,
};
