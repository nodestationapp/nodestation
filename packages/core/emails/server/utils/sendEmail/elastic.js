import axios from "axios";

const elastic = async (data) =>
  new Promise(async (resolve, reject) => {
    const settings = data?.settings?.elastic;

    const url = "https://api.elasticemail.com/v4/emails/transactional";

    const body = {
      Recipients: {
        To: data?.options?.recipients,
      },
      Content: {
        From: `${settings?.header} <${settings?.email}>`,
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
          "X-ElasticEmail-ApiKey": settings?.api_key,
        },
      });

      resolve(send);
    } catch (err) {
      reject(err);
    }
  });

export default elastic;
