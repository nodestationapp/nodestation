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
          errors: {
            email: "The email address or password is incorrect",
          },
        });
      }

      const validPass = await bcrypt.compare(password, result?.password);
      if (!!!validPass) {
        return reject({
          errors: {
            email: "The email address or password is incorrect",
          },
        });
      }

      const access_token = jwt.sign(
        { id: result.id },
        process.env.TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      const refresh_token = jwt.sign(
        { id: result.id },
        process.env.TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      resolve({ access_token, refresh_token });
    } catch (err) {
      reject(err);
    }
  });

export default login;
