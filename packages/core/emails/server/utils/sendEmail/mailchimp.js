import nodemailer from "nodemailer";

const mailchimp = async (data) =>
  new Promise(async (resolve, reject) => {
    const settings = data?.settings?.mailchimp;

    try {
      const user = settings?.email?.split("@")?.[0];

      const config = {
        header: settings?.header,
        host: "smtp.mandrillapp.com",
        port: 465,
        secure: true,
        auth: {
          user: user,
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

export default mailchimp;
