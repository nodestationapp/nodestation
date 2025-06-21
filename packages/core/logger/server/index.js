export default {
  register(app) {
    app.addFieldTypes({
      "logger:endpoint-status": "integer",
      "logger:endpoint-method": "string",
    });
  },
};
