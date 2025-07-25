import axios from "axios";
import { decrypt } from "@nstation/utils";

const elastic = async (data) =>
  new Promise(async (resolve, reject) => {
    const provider = data?.provider;
    const key = decrypt(provider?.content?.api_key);

    const url = "https://api.elasticemail.com/v4/emails/transactional";

    const body = {
      Recipients: {
        To: data?.options?.recipients,
      },
      Content: {
        From: `${provider?.content?.header} <${provider?.email}>`,
        Subject: data?.template?.subject,
        Body: [
          {
            ContentType: "HTML",
            Content: data?.template?.content,
            Charset: "UTF-8",
          },
        ],
      },
    };

    try {
      const send = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          "X-ElasticEmail-ApiKey": key,
        },
      });

      resolve(send);
    } catch (err) {
      reject(err);
    }
  });

export default elastic;
