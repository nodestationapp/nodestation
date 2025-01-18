const mediaSettingsFields = (type, settings) => {
  switch (type) {
    case "local":
      return [];
    case "aws":
      return [
        {
          name: "bucket",
          label: "Bucket name",
          value: settings?.aws?.bucket,
        },
        {
          name: "region",
          label: "Region",
          value: settings?.aws?.region,
        },
        {
          name: "access_key_id",
          label: "Access Key ID",
          value: settings?.aws?.access_key_id,
        },
        {
          name: "secret_access_key",
          label: "Secret access key",
          value: settings?.aws?.secret_access_key,
        },
      ];
    case "digitalocean":
      return [
        {
          name: "bucket",
          label: "Bucket name",
          value: settings?.digitalocean?.bucket,
        },
        {
          name: "region",
          label: "Region",
          value: settings?.digitalocean?.region,
        },
        {
          name: "spaces_endpoint",
          label: "Origin endpoint",
          value: settings?.digitalocean?.spaces_endpoint,
        },
        {
          name: "access_key_id",
          label: "Access Key ID",
          value: settings?.digitalocean?.access_key_id,
        },
        {
          name: "secret_access_key",
          label: "Secret access key",
          value: settings?.digitalocean?.secret_access_key,
        },
      ];
    case "wasabi":
      return [
        {
          name: "bucket",
          label: "Bucket name",
          value: settings?.wasabi?.bucket,
        },
        {
          name: "region",
          label: "Region",
          value: settings?.wasabi?.region,
        },
        {
          name: "access_key_id",
          label: "Access Key ID",
          value: settings?.wasabi?.access_key_id,
        },
        {
          name: "secret_access_key",
          label: "Secret access key",
          value: settings?.wasabi?.secret_access_key,
        },
      ];
    default:
      return [];
  }
};

module.exports = mediaSettingsFields;
