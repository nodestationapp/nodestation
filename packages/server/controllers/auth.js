import {
  login,
  register,
  resetPassword,
  changePassword,
  emailActivation,
  resetPasswordConfirm,
} from "@nstation/auth";
import slugify from "slugify";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { fs } from "@nstation/utils";
import { knex, createSchema } from "@nstation/db";

function removeUndefinedProperties(obj) {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
}

function extractUploadPath(fullPath) {
  const uploadIndex = fullPath.indexOf("/uploads/");
  if (uploadIndex !== -1) {
    return fullPath.substring(uploadIndex);
  }
  return null;
}

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
      if (!!!body?.type || body?.type === "admin") {
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
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getAllAuth = async (req, res) => {
  try {
    const data = await knex("nodestation_users").select();

    const settings = await knex("nodestation_media_settings").first();
    const formatted_data = data?.map((item) => {
      const photo = !!item?.photo ? JSON.parse(item?.photo) : null;

      return {
        ...item,
        ...(!!photo
          ? {
              photo: {
                ...photo,
                url:
                  settings?.active === "local"
                    ? `${process.env.PUBLIC_URL}${photo?.url}`
                    : photo?.url,
              },
            }
          : {}),
      };
    });

    return res.status(200).json(formatted_data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getSettingsAuth = async (_, res) => {
  try {
    const files = fs.getFiles();
    const auth = files?.find((item) => item?.id?.toString() === "auth");

    return res.status(200).json({ fields: auth?.fields });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateSettingsAuth = async (req, res) => {
  const body = req?.body;

  try {
    let formatted_fields = body?.fields?.map((item) =>
      Object.fromEntries(
        Object.entries({
          ...item,
          slug: slugify(item?.name, {
            replacement: "_",
            lower: true,
          }),
        }).filter(([_, value]) => value !== "")
      )
    );

    const formatted_body = {
      ...body,
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
  const body = req?.body;

  const files = fs.getFiles();
  const user_schema = files?.find((item) => item?.id?.toString() === "auth");
  const user_schema_fields = user_schema?.fields;

  try {
    if (req?.files?.length > 0) {
      req?.files?.forEach((item) => {
        const is_field = user_schema_fields?.find(
          (element) => element?.slug === item?.fieldname
        );

        if (!!is_field) {
          const upload_path = !!item?.path
            ? extractUploadPath(item?.path)
            : item?.location;

          body[item?.fieldname] = JSON.stringify({
            name: item?.originalname,
            type: item?.mimetype,
            url: upload_path,
            size: item?.size,
          });
        }
      });
    }

    let formatted_body = user_schema_fields.reduce((acc, curr) => {
      acc[curr.slug] = body?.[curr.slug];
      return acc;
    }, {});

    const uid = uuidv4();
    const created_at = Date.now();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formatted_body?.password, salt);

    formatted_body["id"] = uid;
    formatted_body["password"] = hashedPassword;
    formatted_body["created_at"] = created_at;

    const data = removeUndefinedProperties(formatted_body);

    await knex("nodestation_users").insert(data);

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateUserAuth = async (req, res) => {
  const body = req?.body;
  const { id } = req?.params;

  const files = fs.getFiles();
  const user_schema = files?.find((item) => item?.id?.toString() === "auth");
  const user_schema_fields = user_schema?.fields;

  try {
    if (req?.files?.length > 0) {
      req?.files?.forEach((item) => {
        const is_field = user_schema_fields?.find(
          (element) => element?.slug === item?.fieldname
        );

        if (!!is_field) {
          const upload_path = !!item?.path
            ? extractUploadPath(item?.path)
            : item?.location;

          body[item?.fieldname] = JSON.stringify({
            name: item?.originalname,
            type: item?.mimetype,
            url: upload_path,
            size: item?.size,
          });
        }
      });
    }

    let formatted_body = user_schema_fields.reduce((acc, curr) => {
      acc[curr.slug] = body?.[curr.slug];
      return acc;
    }, {});

    const data = removeUndefinedProperties(formatted_body);

    await knex("nodestation_users").where({ id }).update(data);

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

export {
  getAllAuth,
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
};
