import resetPassword from "../../utils/resetPassword.js";

export default async (req, res) => {
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
