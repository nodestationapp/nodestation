export default {
  register(app) {
    app.addFieldTypes({
      id: "string",
      text: "string",
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
