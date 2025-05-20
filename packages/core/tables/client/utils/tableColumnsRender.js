import Chip from "@mui/material/Chip";
import Date from "../components/MuiTable/components/Date/index.js";
import Boolean from "../components/MuiTable/components/Boolean.js";
import Media from "../components/MuiTable/components/Media/index.js";
import UserProfile from "../components/MuiTable/components/UserProfile/index.js";

const render_options = (column, data) => {
  const colors = column?.options?.reduce((acc, item) => {
    acc[item?.value] = item?.color;
    return acc;
  }, {});

  const isObject = (val) =>
    val !== null && typeof val === "object" && !Array.isArray(val);

  switch (column?.type) {
    case "user_profile":
    case "user":
      return <UserProfile data={data} />;
    case "select":
      return <Chip label={data} color={colors[data]} size="small" />;
    case "boolean":
      return <Boolean data={data} />;
    case "date":
      return <Date data={data} />;
    case "media":
      return <Media data={data} />;
    default:
      return !!!isObject(data) ? data : "-";
  }
};

const tableColumnsRender = ({ columns, preferences }) => {
  return !!columns?.length
    ? columns?.map((column) => {
        let width = preferences?.content?.[column?.slug] || undefined;

        return {
          width: width,
          minWidth: 100,
          field: column?.slug,
          headerName: column?.name,
          renderCell: (params) =>
            column?.renderCell
              ? column?.renderCell(params)
              : render_options(
                  column,
                  params.value !== undefined ? params.value : params?.row
                ),
        };
      })
    : [];
};

export default tableColumnsRender;
