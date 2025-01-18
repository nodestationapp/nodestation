import { knex } from "@nstation/db";

import aws from "./aws.js";
import local from "./local.js";
import wasabi from "./wasabi.js";
import digitalocean from "./digitalocean.js";

const storageProvider = (data) => {
  switch (data?.active) {
    case "local":
      return () => local();
    case "aws":
      return () => aws(data);
    case "digitalocean":
      return () => digitalocean(data);
    case "wasabi":
      return () => wasabi(data);
    default:
      return null;
  }
};

const uploader = async (req, res, next) => {
  const data = await knex("nodestation_media_settings").first();

  if (!!!data?.active) {
    return res.status(500).json({
      error: "File upload failed. Storage provider is not configured.",
    });
  }

  const provider = storageProvider(data);

  provider()(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: err.message });
    }

    next();
  });
};

export default uploader;
