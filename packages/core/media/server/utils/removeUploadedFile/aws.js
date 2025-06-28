import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const extractPathFromUrl = (url) => {
  const regex = /\/(\d+\/.*)$/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const aws = async (url, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const settings = data?.aws;

      const s3 = new S3Client({
        region: settings?.region,
        credentials: {
          accessKeyId: settings?.access_key_id,
          secretAccessKey: settings?.secret_access_key,
        },
      });

      const key = extractPathFromUrl(url);

      const command = new DeleteObjectCommand({
        Bucket: settings?.bucket,
        Key: key,
      });
      await s3.send(command);

      resolve(true);
    } catch (err) {
      console.error(err);
      reject(false);
    }
  });

export default aws;
