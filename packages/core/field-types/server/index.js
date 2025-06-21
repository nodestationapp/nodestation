export default {
  register(app) {
    app.addFieldTypes({
      boolean: "integer",
      select: "string",
    });
  },
};
