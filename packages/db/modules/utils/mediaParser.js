const mediaParser = (fields, objects, settings) => {
  return objects.map((obj) => {
    for (const key in obj) {
      const type = fields?.find((item) => item?.slug === key)?.type;

      if (type === "media") {
        try {
          let media = obj[key];
          obj[key] = media.url
            ? {
                ...media,
                url:
                  settings?.active === "local"
                    ? `${process.env.PUBLIC_URL}${media.url}`
                    : media.url,
              }
            : null;
        } catch (e) {
          obj[key] = null;
        }
      }

      if (type === "user") {
        try {
          let media = obj[key].photo;
          obj[key].photo = media.url
            ? {
                ...media,
                url:
                  settings?.active === "local"
                    ? `${process.env.PUBLIC_URL}${media.url}`
                    : media.url,
              }
            : null;
        } catch (e) {
          obj[key] = null;
        }
      }
    }
    return obj;
  });
};

export default mediaParser;
