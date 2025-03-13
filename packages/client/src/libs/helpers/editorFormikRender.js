const formik_render = (type, data) => {
  switch (type) {
    case "endpoints":
      return {
        type: "endpoints",
        name: data?.path || "/",
        method: data?.name || "post",
        properties: {
          status: data?.properties?.status || "active",
          middlewares: data?.properties?.middlewares || [],
          parser: data?.properties?.parser || "json",
          auth: data?.properties?.auth || [],
        },
      };
    case "cron":
      return {
        type: "cron",
        name: data?.name || "",
        status: data?.status || "active",
        content:
          data?.content ||
          `export default async () => {\n  try{\n    //your code here\n  }catch(err){\n    console.error(err);\n  }\n}`,
        options: {
          schedule: data?.options?.schedule,
          timezone: data?.options?.timezone,
        },
      };
    case "fn":
      return {
        type: "fn",
        options: {},
        name: data?.name || "",
        content:
          data?.content ||
          `export default async () => {\n  try{\n    //your code here\n  }catch(err){\n    console.error(err);\n  }\n}`,
      };
    case "mid":
      return {
        type: "mid",
        name: data?.name || "",
        options: {},
        content:
          data?.content ||
          `export default async (req, res, next) => {\n  //your code here\n  next();\n}`,
      };
    default:
      return "";
  }
};

const editorFormikRender = (type, data) => {
  return formik_render(type, data);
};

module.exports = editorFormikRender;
