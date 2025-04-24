const activeEmailChecker = (data) => {
  const result = {};

  for (const key in data) {
    const value = data[key];

    if (value && typeof value === "object" && !Array.isArray(value)) {
      const allFieldsFilled = Object.values(value).every(
        (field) => field !== null && field !== undefined && field !== ""
      );
      result[key] = allFieldsFilled;
    } else {
      result[key] = false;
    }
  }

  return result;
};

export default activeEmailChecker;
