import moment from "moment";

import Json from "../components/MuiTable/components/Json.js";
import Select from "../components/MuiTable/components/Select.js";
import Date from "../components/MuiTable/components/Date/index.js";
import Boolean from "../components/MuiTable/components/Boolean.js";
import Media from "../components/MuiTable/components/Media/index.js";
import Relation from "../components/MuiTable/components/Relation/index.js";
import UserProfile from "../components/MuiTable/components/UserProfile/index.js";
import EndpointStatus from "../components/MuiTable/components/EndpointStatus.js";
import EndpointMethod from "../components/MuiTable/components/EndpointMethod.js";

const render_options = (column, data) => {
  const isObject = (val) =>
    val !== null && typeof val === "object" && !Array.isArray(val);

  switch (column?.type) {
    case "user_profile":
    case "user":
      return <UserProfile data={data} />;
    case "select":
      return <Select data={data} options={column?.options} />;
    case "boolean":
      return <Boolean data={data} />;
    case "date":
      return <Date data={data} />;
    case "media":
      return <Media data={data} />;
    case "json":
      return <Json data={data} />;
    case "endpoint_status":
      return <EndpointStatus data={data} />;
    case "endpoint_method":
      return <EndpointMethod data={data} />;
    default:
      return !!!isObject(data) ? (
        data
      ) : !!column?.relation ? (
        <Relation data={data} relation={column?.relation} />
      ) : (
        "-"
      );
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
        let width = columnSizes?.[column?.slug] || column?.width || undefined;
        const valueFormatter =
          column?.valueFormatter || getValueFormatter(column);

        return {
          width: width,
          field: column?.slug,
          flex: column?.flex || 0,
          headerName: column?.name,
          minWidth: column?.minWidth || 100,
          type: column?.columnType || column?.type || "string",
          valueOptions: column?.valueOptions || undefined,
          valueGetter: column?.valueGetter || undefined,
          valueFormatter: valueFormatter || undefined,
          renderCell: (params) =>
            !!!valueFormatter
              ? column?.renderCell
                ? column?.renderCell(params)
                : render_options(
                    column,
                    params.value !== undefined ? params.value : params?.row
                  )
              : undefined,
        };
      })
    : [];
};

export default tableColumnsRender;
