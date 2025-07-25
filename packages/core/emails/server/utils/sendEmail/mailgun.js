import nodemailer from "nodemailer";
import { decrypt } from "@nstation/utils";

const mailgun = async (data) =>
  new Promise(async (resolve, reject) => {
    const provider = data?.provider;
    const key = decrypt(provider?.content?.api_key);

    try {
      const config = {
        header: provider?.content?.header,
        host: "smtp.mailgun.org",
        port: 587,
        secure: false,
        auth: {
          user: provider?.email,
          pass: key,
        },
      };

      const transporter = nodemailer.createTransport(config);
      const send = await transporter.sendMail({
        from: `${config?.header} <${config?.auth?.user}>`,
        to: data?.options?.recipients,
        subject: data?.template?.subject,
        html: data?.template?.content,
      });

      resolve(send);
    } catch (err) {
      reject(err);
    }
  });

export default mailgun;
