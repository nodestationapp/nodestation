const editorDefaultContent = (body) => {
  const type = body?.path?.split("/")?.[1];

  switch (type) {
    case "endpoints":
      return `/**
 * @status ${body?.properties?.status || "active"}
 * @parser ${body?.properties?.parser || "json"}
 * @middlewares ${body?.properties?.middlewares || "[]"}
 * @authentication ${body?.properties?.authentication || "[]"}
 */

export default async (req, res) => {
  try {
    //your code here
    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};`;
    case "crons":
      return `/**
* @status ${body?.properties?.status || "active"}
* @schedule ${body?.properties?.schedule || "0 * * * *"}
* @timezone ${body?.properties?.timezone || "Asia/Bangkok"}
*/

export default async () => {
  try{
    //your code here
  }catch(err){
    console.error(err);
  }
}`;
    case "helpers":
      return `export default async () => {
  try{
    //your code here
  }catch(err){
    console.error(err);
  }
}`;
    case "middlewares":
      return `export default async (req, res, next) => {
  //your code here
  next();
}`;
    default:
      return "";
  }
};

export default editorDefaultContent;
