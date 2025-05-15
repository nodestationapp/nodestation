import fs from "fs";
import path from "path";
import { glob } from "glob";
import { knex } from "@nstation/db";
import { rootPath } from "@nstation/utils";

import aws from "./aws.js";
import elastic from "./elastic.js";
import mailgun from "./mailgun.js";
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

  let emails = [];
  const emailFiles = glob.sync(path.join(rootPath, "src", "emails", "*.json"));

  for (const file of emailFiles) {
    const email = JSON.parse(fs.readFileSync(file, "utf8"));
    emails.push(email);
  }

  const current_template = emails?.find(
    (item) => item?.id?.toString() === template?.toString()
  );

  template = {
    ...current_template,
    subject: replaceTemplateVariables(
      current_template?.subject,
      options?.context
    ),
    content: replaceTemplateVariables(
      current_template?.content,
      options?.context
    ),
  };

  if (!!!settings?.active) {
    console.error(
      "Failed to send the email. The email provider is not configured."
    );
    return;
  }

  await emailProvider({ template, options, settings });

  // TODO: add logger

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
