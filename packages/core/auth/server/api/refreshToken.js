import jwt from "jsonwebtoken";

export default async (req, res) => {
  try {
    const payload = jwt.verify(
      req.body.refresh_token,
      process.env.TOKEN_SECRET
    );

    const access_token = jwt.sign(
      { id: payload.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refresh_token = jwt.sign(
      { id: payload.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({ access_token, refresh_token });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
