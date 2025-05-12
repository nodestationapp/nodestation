const mediaSettingsFields = (type, settings) => {
  switch (type) {
    case "local":
      return [];
    case "aws":
      return [
        {
          slug: "bucket",
          name: "Bucket name",
          value: settings?.aws?.bucket,
        },
        {
          slug: "region",
          name: "Region",
          value: settings?.aws?.region,
        },
        {
          slug: "access_key_id",
          name: "Access Key ID",
          value: settings?.aws?.access_key_id,
        },
        {
          slug: "secret_access_key",
          name: "Secret access key",
          value: settings?.aws?.secret_access_key,
        },
      ];
    case "digitalocean":
      return [
        {
          slug: "bucket",
          name: "Bucket name",
          value: settings?.digitalocean?.bucket,
        },
        {
          slug: "region",
          name: "Region",
          value: settings?.digitalocean?.region,
        },
        {
          slug: "spaces_endpoint",
          name: "Origin endpoint",
          value: settings?.digitalocean?.spaces_endpoint,
        },
        {
          slug: "access_key_id",
          name: "Access Key ID",
          value: settings?.digitalocean?.access_key_id,
        },
        {
          slug: "secret_access_key",
          name: "Secret access key",
          value: settings?.digitalocean?.secret_access_key,
        },
      ];
    case "wasabi":
      return [
        {
          slug: "bucket",
          name: "Bucket name",
          value: settings?.wasabi?.bucket,
        },
        {
          slug: "region",
          name: "Region",
          value: settings?.wasabi?.region,
        },
        {
          slug: "access_key_id",
          name: "Access Key ID",
          value: settings?.wasabi?.access_key_id,
        },
        {
          slug: "secret_access_key",
          name: "Secret access key",
          value: settings?.wasabi?.secret_access_key,
        },
      ];
    default:
      return [];
  }
};

export default mediaSettingsFields;
