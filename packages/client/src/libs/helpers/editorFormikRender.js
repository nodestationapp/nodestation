const formik_render = (type, data) => {
  switch (type) {
    case "ep":
      return {
        type: "ep",
        name: data?.name || "/",
        method: data?.metadata?.method || "post",
        properties: {
          status: data?.metadata?.properties?.status || "active",
          middlewares: data?.metadata?.properties?.middlewares || [],
          parser: data?.metadata?.properties?.parser || "json",
          auth: data?.metadata?.properties?.auth || [],
        },
      };
    case "cron":
      return {
        type: "cron",
        name: data?.name || "",
        status: data?.status || "active",
        content:
          data?.content ||
          `export default async () => {\n  try{\n    //your code here\n  }catch(err){\n    console.log(err);\n  }\n}`,
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
          `export default async () => {\n  try{\n    //your code here\n  }catch(err){\n    console.log(err);\n  }\n}`,
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
