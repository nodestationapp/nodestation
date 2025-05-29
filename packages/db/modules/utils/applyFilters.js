const filterQueryBuild = (item, query, table) => {
  switch (item?.operator) {
    case "contains":
      query.where(
        `${table?.tableName}.${item?.field}`,
        "like",
        `%${item?.value}%`
      );
      break;
    case "doesNotContain":
      query.whereNot(
        `${table?.tableName}.${item?.field}`,
        "like",
        `%${item?.value}%`
      );
      break;
    case "equals":
      query.where(`${table?.tableName}.${item?.field}`, item?.value);
      break;
    case "doesNotEqual":
      query.whereNot(`${table?.tableName}.${item?.field}`, item?.value);
      break;
    case "startsWith":
      query.where(
        `${table?.tableName}.${item?.field}`,
        "like",
        `${item?.value}%`
      );
      break;
    case "endsWith":
      query.where(
        `${table?.tableName}.${item?.field}`,
        "like",
        `%${item?.value}`
      );
      break;
    case "isEmpty":
      query.where(function () {
        this.whereNull(`${table?.tableName}.${item?.field}`).orWhere(
          `${table?.tableName}.${item?.field}`,
          ""
        );
      });
      break;
    case "isNotEmpty":
      query.where(function () {
        this.whereNotNull(`${table?.tableName}.${item?.field}`).andWhereNot(
          `${table?.tableName}.${item?.field}`,
          ""
        );
      });
      break;
    case "isAnyOf":
      if (Array.isArray(item?.value)) {
        query.whereIn(`${table?.tableName}.${item?.field}`, item?.value);
      }
      break;
  }
};

const applyFilters = (query, filters, table) => {
  try {
    const removeEmptyFilters = filters?.filter((item) => !!item?.value);

    removeEmptyFilters.forEach((item) => {
      filterQueryBuild(item, query, table);
    });
  } catch (err) {
    console.error(err);
  }
};

export default applyFilters;
