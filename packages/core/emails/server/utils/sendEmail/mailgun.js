import nodemailer from "nodemailer";

const mailgun = async (data) =>
  new Promise(async (resolve, reject) => {
    const settings = data?.settings?.mailgun;

    try {
      const config = {
        header: settings?.header,
        host: "smtp.mailgun.org",
        port: 587,
        secure: false,
        auth: {
          user: settings?.email,
          pass: settings?.api_key,
        },
      };

      const transporter = nodemailer.createTransport(config);
      const send = await transporter.sendMail({
        from: `${settings?.header} <${settings?.email}>`,
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
