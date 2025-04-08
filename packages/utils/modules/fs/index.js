import getFiles from "./helpers/getFiles.js";
import getPluginFiles from "./helpers/getPluginFiles.js";
import createFile from "./helpers/createFile.js";
import updateFile from "./helpers/updateFile.js";
import deleteFile from "./helpers/deleteFile.js";
import generateServer from "./helpers/generateServer/index.js";
import removeUploadedFile from "./helpers/utils/removeUploadedFile/index.js";
import getSchema from "./helpers/getSchema.js";

export default {
  getFiles,
  createFile,
  updateFile,
  deleteFile,
  generateServer,
  getPluginFiles,
  removeUploadedFile,
  getSchema,
};
