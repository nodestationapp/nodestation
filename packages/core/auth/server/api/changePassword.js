import changePassword from "../../utils/changePassword.js";

export default async (req, res) => {
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
