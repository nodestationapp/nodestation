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
          slug: "host",
          name: "Host / Server name",
          value: settings?.smtp?.host,
        },
        {
          slug: "email",
          name: "Email address",
          value: settings?.smtp?.email,
        },
        {
          slug: "password",
          name: "Password",
          value: settings?.smtp?.password,
        },
        {
          slug: "port",
          name: "Port",
          value: settings?.smtp?.port,
        },
        {
          slug: "tls",
          name: "TLS",
          type: "select",
          value: settings?.smtp?.tls,
          options: tls_data,
        },
        {
          slug: "header",
          name: "Header",
          value: settings?.smtp?.header,
        },
      ];
    case "sendgrid":
      return [
        {
          slug: "email",
          name: "Email address",
          value: settings?.sendgrid?.email,
        },
        {
          slug: "api_key",
          name: "API key",
          value: settings?.sendgrid?.api_key,
        },
      ];
    case "mailchimp":
      return [
        {
          slug: "header",
          name: "Header",
          value: settings?.mailchimp?.header,
        },
        {
          slug: "email",
          name: "Email address",
          value: settings?.mailchimp?.email,
        },
        {
          slug: "api_key",
          name: "API key",
          type: "password",
          value: settings?.mailchimp?.api_key,
        },
      ];
    case "mailgun":
      return [
        {
          slug: "header",
          name: "Header",
          value: settings?.mailgun?.header,
        },
        {
          slug: "email",
          name: "Email address",
          value: settings?.mailgun?.email,
        },
        {
          slug: "api_key",
          name: "API key",
          type: "password",
          value: settings?.mailgun?.api_key,
        },
      ];
    case "aws":
      return [
        {
          slug: "header",
          name: "Header",
          value: settings?.aws?.header,
        },
        {
          slug: "email",
          name: "Email address",
          value: settings?.aws?.email,
        },
        {
          slug: "username",
          name: "SMTP username",
          value: settings?.aws?.username,
        },
        {
          slug: "password",
          name: "SMTP password",
          type: "password",
          value: settings?.aws?.password,
        },
      ];
    case "elastic":
      return [
        {
          slug: "header",
          name: "Header",
          value: settings?.elastic?.header,
        },
        {
          slug: "email",
          name: "Email address",
          value: settings?.elastic?.email,
        },
        {
          slug: "api_key",
          name: "API key",
          type: "password",
          value: settings?.elastic?.api_key,
        },
      ];
    default:
      return "";
  }
};

export default emailSettingsFields;
