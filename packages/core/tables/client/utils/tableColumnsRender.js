import moment from "moment";

import Relation from "../components/MuiTable/components/Relation/index.js";
// import EndpointStatus from "../components/MuiTable/components/EndpointStatus.js";
// import EndpointMethod from "../components/MuiTable/components/EndpointMethod.js";

// import fieldTypeData from "../utils/fieldTypeData/index.js";
import { clientfieldTypes } from "@nstation/field-types";

const columnRender = (column, data) => {
  const isObject = (val) =>
    val !== null && typeof val === "object" && !Array.isArray(val);

  const columnInfo = clientfieldTypes()?.find(
    (item) => item?.key === column?.type
  );
  if (!!columnInfo?.columnRender) {
    return columnInfo?.columnRender({ data, options: column?.options });
  } else {
    return !!!isObject(data) ? (
      data
    ) : !!column?.relation ? (
      <Relation data={data} relation={column?.relation} />
    ) : (
      "-"
    );
  }

  // switch (column?.type) {
  //   case "user_profile":
  //   case "user":
  //     return <UserProfile data={data} />;
  //   case "select":
  //     return <Select data={data} options={column?.options} />;
  //   case "boolean":
  //     return <Boolean data={data} />;
  //   case "date":
  //     return <Date data={data} />;
  //   case "media":
  //     return <Media data={data} />;
  //   case "json":
  //     return <Json data={data} />;
  //   case "endpoint_status":
  //     return <EndpointStatus data={data} />;
  //   case "endpoint_method":
  //     return <EndpointMethod data={data} />;
  //   default:
  //     return !!!isObject(data) ? (
  //       data
  //     ) : !!column?.relation ? (
  //       <Relation data={data} relation={column?.relation} />
  //     ) : (
  //       "-"
  //     );
  // }
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
