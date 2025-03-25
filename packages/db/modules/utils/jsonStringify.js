const singleJsonStringify = (value) => {
  return typeof value === "object" && value !== null
    ? JSON.stringify(value, null, 2)
    : value;
};

const stringifyJsonRow = (row) => {
  if (!row) return row;
  Object.keys(row).forEach((key) => {
    if (typeof row[key] === "object" && row[key] !== null) {
      row[key] = JSON.stringify(row[key]);
    }
  });
  return row;
};

const jsonStringify = (data) => {
  if (Array.isArray(data)) {
    return data.map(stringifyJsonRow);
  } else {
    return stringifyJsonRow(data);
  }
};

export default jsonStringify;
export { singleJsonStringify };
