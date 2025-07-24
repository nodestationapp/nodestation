import nodemailer from "nodemailer";

const local = async (data) =>
  new Promise(async (resolve, reject) => {
    const provider = data?.provider;

    const config = {
      header: provider?.content?.header,
      host: provider?.content?.host,
      port: provider?.content?.port,
      secure: provider?.content?.tls === "ssl" ? true : false,
      auth: {
        user: provider?.email,
        pass: provider?.content?.password,
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
