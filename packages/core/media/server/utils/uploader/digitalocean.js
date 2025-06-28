import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const getSpacesEndpoint = (url) => {
  const [protocol, domain] = url.split("//");
  const domainParts = domain.split(".");

  const newDomain = domainParts.slice(1).join(".");
  return `${protocol}//${newDomain}`;
};

const digitalocean = (data) => {
  const settings = data?.digitalocean;

  const s3 = new S3Client({
    endpoint: getSpacesEndpoint(settings.spaces_endpoint),
    region: settings?.region,
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

export default digitalocean;
