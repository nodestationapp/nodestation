import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const wasabi = (data) => {
  const settings = JSON.parse(data?.wasabi);

  const s3 = new S3Client({
    endpoint: `https://s3.${settings.region}.wasabisys.com`,
    region: settings.region,
    credentials: {
      accessKeyId: settings?.access_key_id,
      secretAccessKey: settings?.secret_access_key,
    },
  });

  return multer({
    storage: multerS3({
      s3,
      bucket: settings?.bucket,
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        const current_date = Date.now();
        cb(null, current_date + "/" + file.originalname);
      },
    }),
  }).any();
};

export default wasabi;
