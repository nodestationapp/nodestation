import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const getSpacesEndpoint = (url) => {
  const [protocol, domain] = url.split("//");
  const domainParts = domain.split(".");

  const newDomain = domainParts.slice(1).join(".");
  return `${protocol}//${newDomain}`;
};

const extractPathFromUrl = (url) => {
  const regex = /\/(\d+\/.*)$/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const digitalocean = (url, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const settings = data?.digitalocean;

      const s3 = new S3Client({
        endpoint: getSpacesEndpoint(settings.spaces_endpoint),
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

export default digitalocean;
