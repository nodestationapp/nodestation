const filterQueryBuild = (data, builder) => {
  switch (data?.value) {
    case "null":
      return builder.orWhereNull(data?.key, "like", data?.value);
    default:
      switch (data?.type) {
        case "id":
        case "text":
        case "json":
          return builder.orWhere(data?.key, "like", `%${data?.value}%`);
        case "numeric":
          return builder.orWhere(data?.key, "=", data?.value);
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
        default:
          return builder.orWhere(data?.key, "like", data?.value);
      }
  }
};

const applyFilters = (query, filters, table) => {
  try {
    const removeEmptyFilters = filters?.filter((item) => !!item?.value);

    const formatted_filters = removeEmptyFilters?.reduce((acc, item) => {
      acc[item.field] = Array.isArray(item.value) ? item?.value : [item?.value];
      return acc;
    }, {});

    return query.where((builder) => {
      Object.entries(formatted_filters).forEach(([key, value]) => {
        builder.where((builder) => {
          const type = table?.fields?.find((item) => item?.slug === key)?.type;

          value?.forEach((element) => {
            const data = {
              type,
              value: element,
              originalValue: value,
              key: `${table?.tableName}.${key}`,
              condition: "like",
            };

            const query = filterQueryBuild(data, builder);
            return query;
          });
        });
      });
    });
  } catch (err) {
    console.error(err);
  }
};

export default applyFilters;
