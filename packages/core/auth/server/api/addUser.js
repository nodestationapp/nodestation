import bcrypt from "bcryptjs";

// import upsertEntry from "#libs/upsertEntry.js";

export default async (req, res) => {
  let body = req?.body;
  const files = req?.files;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body?.password, salt);
    body.password = hashedPassword;

    // await upsertEntry({ id: "auth", body, files });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
