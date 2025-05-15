import jwt from "jsonwebtoken";
import { knex } from "@nstation/db";

const emailActivation = async ({ token }) =>
  new Promise(async (resolve, reject) => {
    try {
      const token_exist = await knex("nodestation_users_activation")
        .where({ id: token })
        .first();

      if (!!!token_exist) {
        return reject({ error: "Something went wrong" });
      }

      await knex("nodestation_users")
        .where({ id: token_exist?.uid })
        .update({ status: "active" });

      await knex("nodestation_users_activation")
        .where({ id: token_exist?.id })
        .del();

      const access_token = jwt.sign(
        {
          id: token_exist?.uid,
          iat: new Date().getTime(),
          exp: new Date().setDate(new Date().getDate() + 1),
        },
        process.env.TOKEN_SECRET
      );

      resolve({
        access_token,
      });
    } catch (err) {
      reject(err);
    }
  });

export default emailActivation;
