const removeEmptyKeys = (arr) => {
  return arr.map((obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => {
        return (
          value !== null &&
          value !== undefined &&
          value !== "" &&
          !(Array.isArray(value) && value.length === 0)
        );
      })
    );
  });
};

export default removeEmptyKeys;
