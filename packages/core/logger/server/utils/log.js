import { knex } from "@nstation/db";
import moment from "moment";
import sendEmail from "@nstation/emails/server/utils/sendEmail/index.js";

let lastNotificationTime = null;
const NOTIFICATION_INTERVAL_MS = 10 * 60 * 1000;

const emailTemplate = ({ source, level }) => ({
  subject: "System Error Notification",
  content: `Hello,<br/>A system error occurred and has been automatically logged.<br/><br/
  ><strong>Details:</strong><br/>
  <strong>Level:</strong> ${level}<br/>
  <strong>Source:</strong> ${source}<br/>
  <strong>Date:</strong> ${moment().format("DD MMM YYYY, hh:mm A")}<br/>
  `,
});

export default async (data) => {
  try {
    await knex("nodestation_logger")
      .insert(data)
      .catch((err) => console.error(err));

    if (data?.level === "error") {
      const now = Date.now();

      if (
        !lastNotificationTime ||
        now - lastNotificationTime >= NOTIFICATION_INTERVAL_MS
      ) {
        lastNotificationTime = now;

        const settings = await knex("nodestation_logger_settings")
          .where("key", "errors_notification")
          .first();

        if (!!settings?.active) {
          const formatted_body = JSON.parse(settings?.body);

          if (data?.source !== "email") {
            sendEmail(
              emailTemplate({ source: data?.source, level: data?.level }),
              {
                recipients: formatted_body?.send_to?.split(","),
              }
            );
          }
        }
      }
    }
  } catch (err) {
    console.error(err);
  }

  return true;
};
