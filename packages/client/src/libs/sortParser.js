const sortParser = (sort) => {
  if (!!!sort?.[0]) {
    return "";
  }

  sort = `${sort?.[0]?.id}:${!!sort?.[0]?.desc ? "desc" : "asc"}`;
  return sort;
};

export default sortParser;
