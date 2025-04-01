/**
 * @status active
 * @parser raw
 * @middlewares []
 * @auth []
 */

export default async (req, res) => {
  try {
    //your code here supero
    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
