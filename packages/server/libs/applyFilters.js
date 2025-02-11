const applyFilters = (query, filters, schema) => {
  const formatted_filters = Object.keys(filters)?.reduce((acc, item) => {
    acc[item] = filters[item]?.split(",");
    return acc;
  }, {});

  return query.where((builder) => {
    Object.entries(formatted_filters).forEach(([key, value]) => {
      builder.where((subBuilder) => {
        const type = schema?.find((item) => item?.slug === key)?.type;

        value?.forEach((element) => {
          let method = { key, condition: "like", element };

          if (type === "text") {
            method = { key, condition: "like", element: `%${value}%` };
          }

          return element === "null"
            ? subBuilder.orWhereNull(
                method?.key,
                method?.condition,
                method?.element
              )
            : subBuilder.orWhere(
                method?.key,
                method?.condition,
                method?.element
              );
        });
      });
    });
  });
};

export default applyFilters;
