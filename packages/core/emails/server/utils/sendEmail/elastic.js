import axios from "axios";

const elastic = async (data) => {
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
    await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        "X-ElasticEmail-ApiKey": settings?.api_key,
      },
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};

export default elastic;
