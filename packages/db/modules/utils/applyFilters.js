import moment from "moment";

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
    case "=":
    case "is":
    case "equals":
      query.where(`${table?.tableName}.${item?.field}`, item?.value);
      break;
    case "isDate":
      query
        .where(`${table?.tableName}.${item?.field}`, ">=", item?.value)
        .andWhere(
          `${table?.tableName}.${item?.field}`,
          "<",
          moment.unix(item?.value).endOf("day").unix()
        );
      break;
    case "notDate":
      query
        .where(`${table?.tableName}.${item?.field}`, "<", item?.value)
        .orWhere(
          `${table?.tableName}.${item?.field}`,
          ">=",
          moment.unix(item?.value).endOf("day").unix()
        );
    case "!=":
    case "not":
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
    case ">":
    case "after":
      query.where(`${table?.tableName}.${item?.field}`, ">", item?.value);
      break;
    case ">=":
    case "onOrAfter":
      query.where(`${table?.tableName}.${item?.field}`, ">=", item?.value);
      break;
    case "<":
    case "before":
      query.where(`${table?.tableName}.${item?.field}`, "<", item?.value);
      break;
    case "<=":
    case "onOrBefore":
      query.where(`${table?.tableName}.${item?.field}`, "<=", item?.value);
      break;
  }
};

const applyFilters = (query, filters, table) => {
  try {
    const formattedFilters = filters
      ?.filter((item) => !!item?.value)
      ?.map((item) => {
        const field = table?.fields?.find(
          (field) => field?.slug === item?.field
        );

        if (field?.type === "date") {
          if (typeof item.value !== "number") {
            if (
              typeof item.value === "string" &&
              item.value.match(/^\d{4}-\d{2}-\d{2}T\d{2}$/)
            ) {
              item.value = moment(item?.value, "YYYY-MM-DDTHH").unix();
            } else {
              item.value = moment(item?.value, "ddd MMM DD YYYY HH").unix();
            }
          }

          item.operator =
            item.operator === "is"
              ? "isDate"
              : item.operator === "not"
              ? "notDate"
              : item.operator;
        }

        return item;
      });

    formattedFilters.forEach((item) => {
      filterQueryBuild(item, query, table);
    });
  } catch (err) {
    console.error(err);
  }
};

export default applyFilters;
