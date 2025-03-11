import {
  login,
  register,
  resetPassword,
  changePassword,
  emailActivation,
  resetPasswordConfirm,
} from "@nstation/auth";
import bcrypt from "bcryptjs";
import { fs } from "@nstation/utils";
import { knex, createSchema } from "@nstation/db";

import upsertEntry from "#libs/upsertEntry.js";

const authRegister = async (req, res) => {
  let body = req?.body;

  try {
    const usersCount = await knex("nodestation_users")
      .count("* as count")
      .first()
      .then((row) => row.count);

    if (!!!usersCount) {
      body.type = "admin";
    } else {
      if (body?.type === "admin") {
        return res.status(500).json({ error: "Something went wrong" });
      }
    }

    await register(body);

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

const authLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { access_token } = await login({ email, password });

    return res.status(200).json({ access_token });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

const getSettingsAuth = async (_, res) => {
  try {
    const files = fs.getFiles(`/schemas/auth.json`);

    return res.status(200).json({ fields: files?.[0]?.content?.fields });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateSettingsAuth = async (req, res) => {
  const body = req?.body;

  try {
    let formatted_fields = body?.fields?.filter((field) => {
      return Object.values(field).some((value) => value !== "");
    });

    const formatted_body = {
      ...body,
      slug: "nodestation_users",
      fields: formatted_fields,
    };

    await fs.updateFile("auth", formatted_body);

    await createSchema();

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const addUserAuth = async (req, res) => {
  let body = req?.body;
  const files = req?.files;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body?.password, salt);
    body.password = hashedPassword;

    await upsertEntry({ id: "auth", body, files });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateUserAuth = async (req, res) => {
  const body = req?.body;
  const files = req?.files;
  const { id } = req?.params;

  try {
    await upsertEntry({ id: "auth", body, files, entry_id: id });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const authActivation = async (req, res) => {
  const { token } = req?.body;

  try {
    const { access_token } = await emailActivation({ token });
    return res.status(200).json({ status: "ok", access_token });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

const authResetPassword = async (req, res) => {
  const { email } = req?.body;

  try {
    if (!!req.user) throw new Error();

    await resetPassword({ email });
    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

const authResetPasswordConfirm = async (req, res) => {
  const { password, token } = req?.body;

  try {
    if (!!req.user) throw new Error();

    await resetPasswordConfirm({ password, token });
    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

const authChangePassword = async (req, res) => {
  const user = req?.user;
  const { current_password, new_password } = req.body;

  try {
    await changePassword({ user, current_password, new_password });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

const deleteUserAuth = async (req, res) => {
  const { id } = req?.params;

  try {
    const files = fs.getFiles();
    const auth = files?.find((item) => item?.id?.toString() === "auth");

    await knex(auth?.table).where({ id }).del();

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  getSettingsAuth,
  updateSettingsAuth,
  updateUserAuth,
  addUserAuth,
  authLogin,
  authRegister,
  authActivation,
  authResetPassword,
  authResetPasswordConfirm,
  authChangePassword,
  deleteUserAuth,
};
