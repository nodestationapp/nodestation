import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { knex } from "@nstation/db";

const login = async ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await knex("nodestation_users")
        .where({
          email: email,
          status: "active",
          type: "admin",
        })
        .first();

      if (!!!result) {
        return reject({
          type: "email_exist",
          error: "The email address or password is incorrect",
        });
      }

      const validPass = await bcrypt.compare(password, result?.password);
      if (!!!validPass) {
        return reject({
          type: "email_exist",
          error: "The email address or password is incorrect",
        });
      }

      const access_token = jwt.sign(
        {
          id: result.id,
          iat: new Date().getTime(),
          exp: new Date().setDate(new Date().getDate() + 1),
        },
        process.env.TOKEN_SECRET
      );

      resolve({ access_token });
    } catch (err) {
      reject(err);
    }
  });

export default login;
