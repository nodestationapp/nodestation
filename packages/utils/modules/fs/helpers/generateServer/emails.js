import getFiles from "#modules/fs/helpers/getFiles.js";
import createFile from "#modules/fs/helpers/createFile.js";

const activationEmailTemplate = {
  type: "em",
  locked: true,
  status: "active",
  action: "activation-email",
  name: "Complete Your Account Activation",
  subject: "Complete Your Account Activation",
  content: `Hello {{first_name}},<br/><br/>\n\nYour account has been created.<br/>\nTo activate it, please click the link below:<br/><br/>\n\nhttp://localhost:4000/verify?token={{token}}`,
};

const passwordResetTemplate = {
  type: "em",
  locked: true,
  status: "active",
  action: "password-reset",
  name: "Reset Your Account Password",
  subject: "Reset Your Account Password",
  content: `Hello {{first_name}},<br/><br/>\n\nWe received a request to reset your password.<br/>\nTo reset it, click the link below:<br/><br/>\n\nhttp://localhost:4000/forget-password/reset?token={{token}}`,
};

export default async () => {
  try {
    const emails = getFiles(["emails"]);
    if (!!!emails?.find((item) => item?.action === "activation-email")) {
      // await createFile(activationEmailTemplate);
    }

    if (!!!emails?.find((item) => item?.action === "password-reset")) {
      // await createFile(passwordResetTemplate);
    }
  } catch (err) {
    console.error(err);
  }
};
