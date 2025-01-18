const folderNameParser = (type) => {
  switch (type) {
    case "cron":
      return "crons";
    case "form":
      return "forms";
    case "em":
      return "emails";
    case "tbl":
      return "tables";
    case "fn":
      return "helpers";
    case "ep":
      return "endpoints";
    case "mid":
      return "middlewares";
    default:
      return "/";
  }
};

export default folderNameParser;
