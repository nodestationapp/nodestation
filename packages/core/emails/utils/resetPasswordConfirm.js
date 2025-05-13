import bcrypt from "bcryptjs";
import { knex } from "@nstation/db";

const resetPasswordConfirm = async (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const token_exist = await knex("nodestation_passwords_reset")
        .where({ token: body?.token })
        .first();

      if (!!!token_exist) {
        return reject({ error: "Something went wrong" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body?.password, salt);

      await knex("nodestation_users")
        .where({ id: token_exist?.uid })
        .update({ password: hashedPassword });

      await knex("nodestation_passwords_reset")
        .where({ token: body?.token })
        .del();

      resolve({ status: "ok" });
    } catch (err) {
      reject(err);
    }
  });

export default resetPasswordConfirm;
