import addEmail from "./addEmail.js";
import getEmails from "./getEmails.js";
import deleteEmail from "./deleteEmail.js";
import getEmailSettings from "./getEmailSettings.js";
import updateEmailSettings from "./updateEmailSettings.js";
import addEmailProvider from "./addEmailProvider.js";
import updateEmailProvider from "./updateEmailProvider.js";

import getEmailsSchema from "../docs/get-emails.js";
import addEmailSchema from "../docs/post-email.js";
import deleteEmailSchema from "../docs/delete-email.js";
import getEmailSettingsSchema from "../docs/get-email-settings.js";
import updateEmailSettingsSchema from "../docs/put-email-settings.js";

export default [
  {
    method: "GET",
    path: "/admin-api/emails",
    handler: getEmails,
    auth: ["admin"],
    validation: getEmailsSchema,
  },
  {
    method: "POST",
    path: "/admin-api/emails",
    handler: addEmail,
    auth: ["admin"],
    validation: addEmailSchema,
  },
  {
    method: "DELETE",
    path: "/admin-api/emails/:id",
    handler: deleteEmail,
    auth: ["admin"],
    validation: deleteEmailSchema,
  },
  {
    method: "GET",
    path: "/admin-api/emails/settings",
    handler: getEmailSettings,
    auth: ["admin"],
    validation: getEmailSettingsSchema,
  },
  {
    method: "PUT",
    path: "/admin-api/emails/settings",
    handler: updateEmailSettings,
    auth: ["admin"],
    validation: updateEmailSettingsSchema,
  },
  {
    method: "POST",
    path: "/admin-api/emails/providers",
    handler: addEmailProvider,
    auth: ["admin"],
    // validation: addEmailProviderSchema,
  },
  {
    method: "PUT",
    path: "/admin-api/emails/providers/:id",
    handler: updateEmailProvider,
    auth: ["admin"],
    // validation: addEmailProviderSchema,
  },
];
