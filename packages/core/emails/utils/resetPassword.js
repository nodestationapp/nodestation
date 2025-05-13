import { v4 as uuid } from "uuid";
import { knex } from "@nstation/db";
import { sendEmail } from "@nstation/utils";

const resetPassword = async (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await knex("nodestation_users")
        .where({ email: body?.email })
        .first();

      if (!!!user) {
        return resolve({ status: "ok" });
      }

      const token = uuid.v4();
      const created_at = Date.now();

      await knex("nodestation_passwords_reset").insert({
        token,
        created_at,
        uid: user?.id,
      });

      const context_body = {
        ...user,
        token,
        created_at,
      };

      sendEmail("password-reset", {
        recipients: [user?.email],
        context: { ...context_body, PUBLIC_URL: process.env.PUBLIC_URL },
      });

      resolve({ status: "ok" });
    } catch (err) {
      reject(err);
    }
  });

export default resetPassword;
