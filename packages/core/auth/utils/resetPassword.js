import { knex } from "@nstation/db";
import sendEmail from "../../emails/server/utils/sendEmail/index.js";

const resetPassword = async (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await knex("nodestation_users")
        .where({ email: body?.email })
        .first();

      if (!!!user) {
        return resolve({ status: "ok" });
      }

      const auth_settings = await knex("nodestation_users_settings").first();

      const password_reset_token = await knex(
        "nodestation_users_password_reset"
      )
        .insert({
          uid: user?.id,
        })
        .returning("id");

      const context_body = {
        ...user,
        PUBLIC_URL: process.env.PUBLIC_URL,
        token: password_reset_token?.[0]?.id,
      };

      sendEmail(auth_settings?.forget_password_template, {
        recipients: [user?.email],
        context: context_body,
      });

      resolve({ status: "ok" });
    } catch (err) {
      reject(err);
    }
  });

export default resetPassword;
