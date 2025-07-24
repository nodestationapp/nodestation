import nodemailer from "nodemailer";

const aws = async (data) =>
  new Promise(async (resolve, reject) => {
    const provider = data?.provider;

    try {
      const config = {
        header: provider?.content?.header,
        host: "email-smtp.ap-southeast-1.amazonaws.com",
        port: 465,
        secure: true,
        auth: {
          user: provider?.content?.username,
          pass: provider?.content?.password,
        },
      };

      const transporter = nodemailer.createTransport(config);
      const send = await transporter.sendMail({
        from: `${provider?.content?.header} <${provider?.email}>`,
        to: data?.options?.recipients,
        subject: data?.template?.subject,
        html: data?.template?.content,
      });

      resolve(send);
    } catch (err) {
      reject(err);
    }
  });

export default aws;
