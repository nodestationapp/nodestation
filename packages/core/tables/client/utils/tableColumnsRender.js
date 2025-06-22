import moment from "moment";
import { clientFieldTypes } from "@nstation/field-types";

const columnRender = (column, data) => {
  const isObject = (val) =>
    val !== null && typeof val === "object" && !Array.isArray(val);

  const columnInfo = clientFieldTypes()?.find(
    (item) => item?.key === column?.type
  );
  if (!!columnInfo?.columnRender) {
    return columnInfo?.columnRender({ data, column });
  } else {
    return !!!isObject(data) ? data : "-";
  }
};

const getValueFormatter = (column) => {
  switch (column?.type) {
    case "date":
      return (params) =>
        !!params ? moment.unix(params).format("DD MMM YYYY, hh:mm A") : "-";
    default:
      return undefined;
  }
};

const getType = (column) => {
  switch (column?.type) {
    case "numeric":
      return "number";
    case "date":
      return "date";
    default:
      return "string";
  }
};

const tableColumnsRender = ({ columns, columnSizes }) => {
  return !!columns?.length
    ? columns?.map((column) => {
        let width = columnSizes?.[column?.slug] || column?.width || undefined;
        const valueFormatter =
          column?.valueFormatter || getValueFormatter(column);
        const type = column?.columnType || getType(column);

        return {
          type,
          width,
          field: column?.slug,
          flex: column?.flex || 0,
          headerName: column?.name,
          minWidth: column?.minWidth || 100,
          valueOptions: column?.valueOptions || undefined,
          valueGetter: column?.valueGetter || undefined,
          valueFormatter: valueFormatter || undefined,
          renderCell: (params) =>
            !!!valueFormatter
              ? column?.renderCell
                ? column?.renderCell(params)
                : columnRender(
                    column,
                    params.value !== undefined ? params.value : params?.row
                  )
              : undefined,
        };
      })
    : [];
};

export default tableColumnsRender;
