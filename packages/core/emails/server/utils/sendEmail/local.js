import nodemailer from "nodemailer";

const local = async (data) =>
  new Promise(async (resolve, reject) => {
    const settings = data?.settings?.smtp;

    const config = {
      header: settings?.header,
      host: settings?.host,
      port: settings?.port,
      secure: settings?.tls === "ssl" ? true : false,
      auth: {
        user: settings?.email,
        pass: settings?.password,
      },
    };

    const transporter = nodemailer.createTransport(config);

    try {
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

export default local;
