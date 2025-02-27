import { knex } from "@nstation/db";

import aws from "./aws.js";
import elastic from "./elastic.js";
import mailgun from "./mailgun.js";
import fs from "#modules/fs/index.js";
import mailchimp from "./mailchimp.js";

const emailProvider = (data) => {
  switch (data?.settings?.active) {
    case "elastic":
      return elastic(data);
    case "mailchimp":
      return mailchimp(data);
    case "mailgun":
      return mailgun(data);
    case "aws":
      return aws(data);
    default:
      return null;
  }
};

function replaceTemplateVariables(template, data) {
  return template.replace(/{{(.*?)}}/g, (match, variable) => {
    const key = variable.trim();
    return data[key] !== undefined ? data[key] : match;
  });
}

const sendEmail = async (template, options) => {
  const settings = await knex("nodestation_email_settings").first();

  const emails = fs.getFiles(["emails"]);
  template = emails?.find(
    (item) => item?.action === template || item?.id === template
  );
  template = {
    ...template,
    subject: replaceTemplateVariables(template?.subject, options?.context),
    content: replaceTemplateVariables(template?.content, options?.context),
  };

  if (!!!settings?.active) {
    console.error(
      "Failed to send the email. The email provider is not configured."
    );
    return;
  }

  await emailProvider({ template, options, settings });

  // await logger({
  //   level: "success",
  //   source: {
  //     type: "emails",
  //     name: template?.name,
  //   },
  //   message: `email_message_sent`,
  //   responseBody: {
  //     template,
  //     recipients: options?.recipients,
  //   },
  // });
};

export default sendEmail;
