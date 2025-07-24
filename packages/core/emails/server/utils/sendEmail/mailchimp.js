import nodemailer from "nodemailer";

const mailchimp = async (data) =>
  new Promise(async (resolve, reject) => {
    const provider = data?.provider;

    try {
      const user = provider?.email?.split("@")?.[0];

      const config = {
        header: provider?.content?.header,
        host: "smtp.mandrillapp.com",
        port: 465,
        secure: true,
        auth: {
          user: user,
          pass: provider?.content?.api_key,
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

export default mailchimp;
