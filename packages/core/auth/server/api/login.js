import login from "../../utils/login.js";

export default async (req, res) => {
  const { email, password } = req.body;

  try {
    const { access_token } = await login({ email, password });

    return res.status(200).json({ access_token });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
