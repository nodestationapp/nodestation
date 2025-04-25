import resetPasswordConfirm from "../../utils/resetPasswordConfirm.js";

export default async (req, res) => {
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
