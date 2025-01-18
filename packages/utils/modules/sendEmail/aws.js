import nodemailer from "nodemailer";

const aws = async (data) => {
  const settings = JSON.parse(data?.settings?.aws);

  try {
    const config = {
      header: settings?.header,
      host: "email-smtp.ap-southeast-1.amazonaws.com",
      port: 465,
      secure: true,
      auth: {
        user: settings?.username,
        pass: settings?.password,
      },
    };

    const transporter = nodemailer.createTransport(config);
    await transporter.sendMail({
      from: `${settings?.header} <${settings?.email}>`,
      to: data?.options?.recipients,
      subject: data?.template?.subject,
      html: data?.template?.content,
    });
  } catch (err) {
    console.error(err);
  }
};

export default aws;
