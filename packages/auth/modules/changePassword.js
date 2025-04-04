import bcrypt from "bcryptjs";
import { knex } from "@nstation/db";

const changePassword = async ({ user, current_password, new_password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const validPass = await bcrypt.compare(current_password, user.password);
      if (!!!validPass) {
        return reject({
          errors: {
            current_password: "Current password is incorrect.",
          },
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(new_password, salt);

      await knex("nodestation_users")
        .where({
          id: user?.id,
        })
        .update({
          password: hashedPassword,
        });

      resolve();
    } catch (err) {
      reject(err);
    }
  });

export default changePassword;
