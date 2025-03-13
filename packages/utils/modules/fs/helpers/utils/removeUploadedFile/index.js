import { knex } from "@nstation/db";

import aws from "./aws.js";
import local from "./local.js";
import digitalocean from "./digitalocean.js";

const storageProvider = (url, data) => {
  switch (data?.active) {
    case "local":
      return local(url);
    case "aws":
      return aws(url, data);
    case "digitalocean":
      return digitalocean(url, data);
    default:
      return null;
  }
};

const removeUploadedFile = async (url) => {
  const data = await knex("nodestation_media_settings").first();
  const deleteFile = await storageProvider(url, data);
  return deleteFile;
};

export default removeUploadedFile;
