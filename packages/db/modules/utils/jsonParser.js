const parseJsonRow = (row) => {
  if (!row) return row;
  Object.keys(row).forEach((key) => {
    if (typeof row[key] === "string" && isJson(row[key])) {
      row[key] = JSON.parse(row[key]);
    }
  });

  return row;
};

const isJson = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

const jsonParser = (data) => {
  if (Array.isArray(data)) {
    return data.map(parseJsonRow);
  } else {
    return parseJsonRow(data);
  }
};

export default jsonParser;
