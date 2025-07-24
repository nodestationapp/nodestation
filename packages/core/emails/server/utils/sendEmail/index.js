import fs from "fs";
import path from "path";
import { glob } from "glob";
import { knex } from "@nstation/db";
import { log } from "@nstation/logger";
import { rootPath } from "@nstation/utils";

import aws from "./aws.js";
import local from "./local.js";
import elastic from "./elastic.js";
import mailgun from "./mailgun.js";
import mailchimp from "./mailchimp.js";

const emailProvider = (data) => {
  switch (data?.provider?.provider) {
    case "elastic":
      return elastic(data);
    case "mailchimp":
      return mailchimp(data);
    case "mailgun":
      return mailgun(data);
    case "aws":
      return aws(data);
    case "smtp":
      return local(data);
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

const sendEmail = async (template, options, metadata) => {
  try {
    let provider = null;

    if (options?.sender) {
      provider = await knex("nodestation_email_providers")
        .where("email", options?.sender)
        .first();
    } else {
      provider = await knex("nodestation_email_providers")
        .where("is_default", 1)
        .first();
    }

    let emails = [];
    const emailFiles = glob.sync(
      path.join(rootPath, "src", "emails", "*.json")
    );

    for (const file of emailFiles) {
      const email = JSON.parse(fs.readFileSync(file, "utf8"));
      emails.push(email);
    }

    let current_template = emails?.find(
      (item) => item?.id?.toString() === template?.toString()
    );

    if (template !== null && typeof template === "object") {
      current_template = template;
    } else {
      current_template = emails?.find(
        (item) => item?.id?.toString() === template?.toString()
      );
    }

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

    if (!!!provider) {
      console.error(
        "Failed to send the email – the email provider is not configured."
      );

      await log({
        level: "error",
        source: "email",
        user: metadata?.user || null,
        message:
          "Failed to send the email – the email provider is not configured.",
      });

      return false;
    }

    const send = await emailProvider({ template, options, provider });

    await log({
      level: "success",
      source: "email",
      user: metadata?.user || null,
      label: `Email sent to ${options?.recipients?.join(", ")}`,
      message: {
        template,
        options,
        response: send?.data || send,
      },
    });

    return send;
  } catch (err) {
    console.error(err);

    await log({
      level: "error",
      source: "email",
      label: `Unable to send email to ${options?.recipients?.join(", ")}`,
      message: err?.response?.data || err,
    });
  }
};

export default sendEmail;
