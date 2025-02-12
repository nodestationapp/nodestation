const filterQueryBuild = (data, builder) => {
  switch (data?.value) {
    case "null":
      return builder.orWhereNull(data?.key, data?.condition, data?.value);
    default:
      switch (data?.type) {
        case "date":
          if (data?.originalValue?.[0] && data?.originalValue?.[1]) {
            return builder.whereBetween(data?.key, data?.originalValue);
          }
          if (data?.originalValue?.[0]) {
            return builder.orWhere(data?.key, ">=", data?.originalValue?.[0]);
          }
          if (data?.originalValue?.[1]) {
            return builder.orWhere(data?.key, "<=", data?.originalValue?.[1]);
          }
          return builder;
        case "text":
          return builder.orWhere(
            data?.key,
            data?.condition,
            `%${data?.value}%`
          );
        default:
          return builder.orWhere(data?.key, data?.condition, data?.value);
      }
  }
};

const applyFilters = (query, filters, schema) => {
  const formatted_filters = Object.keys(filters)?.reduce((acc, item) => {
    acc[item] = filters[item]?.split(",");
    return acc;
  }, {});

  return query.where((builder) => {
    Object.entries(formatted_filters).forEach(([key, value]) => {
      builder.where((builder) => {
        const type = schema?.find((item) => item?.slug === key)?.type;

        value?.forEach((element) => {
          const data = {
            key,
            type,
            value: element,
            originalValue: value,
            condition: "like",
          };

          const query = filterQueryBuild(data, builder);
          return query;
        });
      });
    });
  });
};

export default applyFilters;
