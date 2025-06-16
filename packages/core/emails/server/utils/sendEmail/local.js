import nodemailer from "nodemailer";

const local = async (data) => {
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
    await transporter.sendMail({
      from: `${config?.header} <${config?.auth?.user}>`,
      to: data?.options?.recipients,
      subject: data?.template?.subject,
      html: data?.template?.content,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};

export default local;
