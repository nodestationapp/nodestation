import bcrypt from "bcryptjs";
import { knex } from "@nstation/db";
import sendEmail from "@nstation/emails/server/utils/sendEmail/index.js";

const register = async (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const email_exist = await knex("nodestation_users")
        .where({ email: body?.email })
        .first();
      const auth_settings = await knex("nodestation_users_settings").first();

      if (!!email_exist) {
        return reject({ error: "Email address already exist" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body?.password, salt);

      const newUser = await knex("nodestation_users")
        .insert({
          type: body?.type,
          email: body?.email,
          password: hashedPassword,
          last_name: body?.last_name,
          first_name: body?.first_name,
          status: body?.type === "admin" ? "active" : "inactive",
        })
        .returning("id");

      if (body?.type !== "admin") {
        const activation_token = await knex("nodestation_users_activation")
          .insert({
            uid: newUser?.[0]?.id,
          })
          .returning("id");

        const context_body = {
          ...body,
          token: activation_token?.[0]?.id,
          PUBLIC_URL: process.env.PUBLIC_URL,
        };
        sendEmail(auth_settings?.email_verification_template, {
          recipients: [body?.email],
          context: context_body,
        });
      }

      resolve({ status: "ok" });
    } catch (err) {
      reject(err);
    }
  });

export default register;
