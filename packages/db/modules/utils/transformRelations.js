function setDeepValue(obj, keys, value) {
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      if (typeof current[key] !== "object" || current[key] === null) {
        current[key] = {};
      }
      current = current[key];
    }
  }
}

function transformRelations(data) {
  return data.map((item) => {
    const transformedItem = {};

    for (const [key, value] of Object.entries(item)) {
      if (key.includes(".")) {
        const keys = key.split(".");

        const parentPath = keys.slice(0, -1).join(".");
        const topLevelPath = keys[0];

        if (item?.[`${parentPath}.id`] || item?.[`${topLevelPath}.id`]) {
          setDeepValue(transformedItem, keys, value);
        } else {
          setDeepValue(transformedItem, keys.slice(0, -1), null);
        }
      } else {
        transformedItem[key] = value;
      }
    }

    return transformedItem;
  });
}

export default transformRelations;
