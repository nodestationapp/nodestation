import bcrypt from "bcryptjs";
import { knex } from "@nstation/db";

const resetPasswordConfirm = async (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const token_exist = await knex("nodestation_users_password_reset").where({
        id: body?.token,
      });

      if (!!!token_exist?.length) {
        return reject({ error: "Something went wrong" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body?.password, salt);

      await knex("nodestation_users")
        .where({ id: token_exist[0]?.uid })
        .update({ password: hashedPassword });

      await knex("nodestation_users_password_reset")
        .where({ id: body?.token })
        .del();

      resolve({ status: "ok" });
    } catch (err) {
      reject(err);
    }
  });

export default resetPasswordConfirm;
