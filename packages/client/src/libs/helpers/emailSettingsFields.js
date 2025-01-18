const tls_data = [
  {
    label: "SSL",
    value: "ssl",
  },
  {
    label: "STARTTLS",
    value: "starttls",
  },
];

const emailSettingsFields = (type, settings) => {
  switch (type) {
    case "smtp":
      return [
        {
          name: "host",
          label: "Host / Server name",
          value: settings?.smtp?.host,
        },
        {
          name: "email",
          label: "Email address",
          value: settings?.smtp?.email,
        },
        {
          name: "password",
          label: "Password",
          value: settings?.smtp?.password,
        },
        {
          name: "port",
          label: "Port",
          value: settings?.smtp?.port,
        },
        {
          name: "tls",
          label: "TLS",
          type: "select",
          value: settings?.smtp?.tls,
          options: tls_data,
        },
        {
          name: "header",
          label: "Header",
          value: settings?.smtp?.header,
        },
      ];
    case "sendgrid":
      return [
        {
          name: "email",
          label: "Email address",
          value: settings?.sendgrid?.email,
        },
        {
          name: "api_key",
          label: "API key",
          value: settings?.sendgrid?.api_key,
        },
      ];
    case "mailchimp":
      return [
        {
          name: "header",
          label: "Header",
          value: settings?.mailchimp?.header,
        },
        {
          name: "email",
          label: "Email address",
          value: settings?.mailchimp?.email,
        },
        {
          name: "api_key",
          label: "API key",
          type: "password",
          value: settings?.mailchimp?.api_key,
        },
      ];
    case "mailgun":
      return [
        {
          name: "header",
          label: "Header",
          value: settings?.mailgun?.header,
        },
        {
          name: "email",
          label: "Email address",
          value: settings?.mailgun?.email,
        },
        {
          name: "api_key",
          label: "API key",
          type: "password",
          value: settings?.mailgun?.api_key,
        },
      ];
    case "aws":
      return [
        {
          name: "header",
          label: "Header",
          value: settings?.aws?.header,
        },
        {
          name: "email",
          label: "Email address",
          value: settings?.aws?.email,
        },
        {
          name: "username",
          label: "SMTP username",
          value: settings?.aws?.username,
        },
        {
          name: "password",
          label: "SMTP password",
          type: "password",
          value: settings?.aws?.password,
        },
      ];
    case "elastic":
      return [
        {
          name: "header",
          label: "Header",
          value: settings?.elastic?.header,
        },
        {
          name: "email",
          label: "Email address",
          value: settings?.elastic?.email,
        },
        {
          name: "api_key",
          label: "API key",
          type: "password",
          value: settings?.elastic?.api_key,
        },
      ];
    default:
      return "";
  }
};

module.exports = emailSettingsFields;
