import moment from "moment";
import { clientFieldTypes } from "@nstation/field-types";

const columnRender = (column, data, columnInfo) => {
  const isObject = (val) =>
    val !== null && typeof val === "object" && !Array.isArray(val);

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

const tableColumnsRender = ({ columns, columnSizes }) => {
  return !!columns?.length
    ? columns?.map((column) => {
        const columnInfo = clientFieldTypes()?.find(
          (item) => item?.key === column?.type
        );

        const type = columnInfo?.columnType || "string";
        let width = columnSizes?.[column?.slug] || column?.width || undefined;
        const valueFormatter =
          column?.valueFormatter || getValueFormatter(column);

        return {
          type,
          width,
          align: "left",
          headerAlign: "left",
          field: column?.slug,
          flex: column?.flex || 0,
          headerName: column?.name,
          minWidth: column?.minWidth || 100,
          filterable:
            columnInfo?.filterable !== undefined
              ? columnInfo?.filterable
              : true,
          valueOptions: !!columnInfo?.filterValueOptions
            ? columnInfo?.filterValueOptions(column?.options)
            : column?.options || undefined,
          valueGetter: column?.valueGetter || undefined,
          valueFormatter: valueFormatter || undefined,
          filterOperators: !!columnInfo?.filterOperators
            ? columnInfo?.filterOperators(column)
            : undefined,
          renderCell: (params) =>
            !!!valueFormatter
              ? column?.renderCell
                ? column?.renderCell(params)
                : columnRender(
                    column,
                    params.value !== undefined ? params.value : params?.row,
                    columnInfo
                  )
              : undefined,
        };
      })
    : [];
};

export default tableColumnsRender;
