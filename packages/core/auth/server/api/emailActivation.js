import emailActivation from "../../utils/emailActivation.js";

export default async (req, res) => {
  const { token } = req?.body;

  try {
    const { access_token } = await emailActivation({ token });
    return res.status(200).json({
      status: "ok",
      access_token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
