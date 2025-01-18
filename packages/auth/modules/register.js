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

      const uid = uuidv4();
      const token = uuidv4();
      const created_at = Date.now();

      await knex("nodestation_users").insert({
        created_at,
        type: body?.type,
        email: body?.email,
        password: hashedPassword,
        last_name: body?.last_name,
        first_name: body?.first_name,
        status: body?.type === "admin" ? "active" : "inactive",
      });

      if (body?.type !== "admin") {
        await knex("nodestation_email_activations").insert({
          uid: uid,
          token: token,
          created_at: created_at,
        });

        const context_body = {
          ...body,
          uid,
          token,
          created_at,
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
