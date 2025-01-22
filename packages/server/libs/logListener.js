import { logger, fs } from "@nstation/utils";

const getFormName = (url) => {
  const id = url?.split("/")?.[url?.split("/")?.length - 1];

  const forms = fs.getFiles(["forms"]);
  const form = forms?.find((item) => item?.id?.toString() === id?.toString());

  return form?.name || null;
};

const getLevel = (status) => {
  let level = null;

  if (status >= 100 && status <= 399) {
    level = "success";
  } else if (status >= 400 && status <= 599) {
    level = "error";
  }

  return level;
};

const getType = (url) => {
  switch (true) {
    case url.startsWith("/system/forms"):
      return "forms";
    case url.startsWith("/login"):
      return "auth";
    default:
      return "endpoint";
  }
};

const getMessage = (url, status) => {
  const level = getLevel(status);

  switch (true) {
    case url.startsWith("/system/forms"):
      return level === "success" ? "form_success" : "form_failed";
    case url.startsWith("/login"):
      return level === "success" ? "login_success" : "login_failed";
    default:
      return "endpoint";
  }
};

const getName = (type, url) => {
  switch (type) {
    case "forms":
      return getFormName(url);
    case "auth":
      return "Authentication";
    default:
      return "endpoint";
  }
};

const logTypeOptions = ({ req, res, responseTime, responseBody }) => {
  const path = req.url.replace("/api", "");

  const type = getType(req?.url);
  const name = getName(type, req?.url);
  const level = getLevel(res?.statusCode);
  const message = getMessage(req?.url, res?.statusCode);

  return {
    req,
    res,
    level,
    message,
    source: {
      path,
      type,
      name,
    },
    responseBody,
    responseTime,
  };
};

const logListener = async ({ app }) => {
  app.use((req, res, next) => {
    let responseBody;
    const startDate = new Date();
    const originalSend = res.send;

    res.send = function (body) {
      responseBody = JSON.parse(body);
      return originalSend.apply(this, arguments);
    };

    const loggedPaths = ["/api", "/admin/api/auth/login"];
    const loggedMethod = ["POST", "GET", "PUT", "DELETE"];

    if (
      loggedPaths?.some((item) => req?.url.startsWith(item)) &&
      loggedMethod?.includes(req?.method)
    ) {
      res.on("finish", () => {
        const responseTime = Date.now() - startDate;

        const data = logTypeOptions({ req, res, responseTime, responseBody });

        logger(data);
      });
    }

    next();
  });
};

export default logListener;
