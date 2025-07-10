export default {
  register(app) {
    app.addFieldTypes({
      id: "string",
      text: "text",
      boolean: "integer",
      select: "string",
      numeric: "integer",
      media: "string",
      user: "string",
      json: "json",
      date: "bigInteger",
    });
  },
};
