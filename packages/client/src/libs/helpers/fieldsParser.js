const fieldsParser = (fields, data) => {
  return fields?.map((item) => data?.[item?.slug]?.name || data?.[item?.slug]);
};

module.exports = fieldsParser;
