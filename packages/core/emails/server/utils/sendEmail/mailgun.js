import nodemailer from "nodemailer";

const mailgun = async (data) => {
  const settings = JSON.parse(data?.settings?.mailgun);

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

export default mailgun;
