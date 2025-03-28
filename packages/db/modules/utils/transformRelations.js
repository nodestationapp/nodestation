function transformRelations(data, settings) {
  return data.map((flatObject) => {
    const nestedObject = {};

    for (const key in flatObject) {
      const value = flatObject[key];
      const keys = key.split(".");

      let current = nestedObject;

      keys.forEach((part, index) => {
        if (!current[part]) {
          current[part] = index === keys.length - 1 ? value : {};
        }

        if (typeof current[part] !== "object") {
          current[part] = {};
        }

        if (index === keys.length - 1) {
          current[part] = value;
        } else {
          current = current[part];
        }
      });
    }

    return nestedObject;
  });
}

export default transformRelations;
