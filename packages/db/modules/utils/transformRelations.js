function transformRelations(data, settings) {
  return data.map((item) => {
    const transformedItem = {};

    for (const [key, value] of Object.entries(item)) {
      if (key.includes(".")) {
        const keys = key.split(".");
        const parent = keys.shift();
        const nestedKey = keys.join(".");

        if (typeof transformedItem[parent] !== "object") {
          transformedItem[parent] = {};
        }

        if (!!item?.[`${parent}.id`]) {
          if (nestedKey === "photo") {
            let media = !!value ? value : null;
            transformedItem[parent][nestedKey] = !!media?.url
              ? {
                  ...media,
                  url:
                    settings?.active === "local"
                      ? `${process.env.PUBLIC_URL}${media?.url}`
                      : media?.url,
                }
              : null;
          } else {
            transformedItem[parent][nestedKey] = value;
          }
        } else {
          transformedItem[parent] = null;
        }
      } else {
        transformedItem[key] = value;
      }
    }

    return transformedItem;
  });
}

export default transformRelations;
