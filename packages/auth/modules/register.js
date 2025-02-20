import { v4 as uuidv4 } from "uuid";

import bcrypt from "bcryptjs";
import { knex } from "@nstation/db";
import { sendEmail } from "@nstation/utils";

const register = async (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const email_exist = await knex("nodestation_users")
        .where({ email: body?.email })
        .first();

      if (!!email_exist) {
        return reject({ error: "Email address already exist" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body?.password, salt);

      const token = uuidv4();

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
        await knex("nodestation_email_activations").insert({
          uid: newUser?.[0]?.id,
          token: token,
        });

        const context_body = {
          ...body,
          token,
          PUBLIC_URL: process.env.PUBLIC_URL,
        };

        sendEmail("activation-email", {
          recipients: [body?.email],
          context: { ...context_body },
        });
      }

      resolve({ status: "ok" });
    } catch (err) {
      reject(err);
    }
  });

export default register;
