import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { Divider, IconButton, Stack } from "@mui/material";

const TableRowEditorPreview = ({
  table_data,
  fieldTypes,
  data,
  setEditMode,
}) => {
  const columnRender = (column, data, columnInfo) => {
    const isObject = (val) =>
      val !== null && typeof val === "object" && !Array.isArray(val);

    if (!!columnInfo?.columnRender) {
      return columnInfo?.columnRender({ data, column });
    } else {
      return !!!isObject(data) ? data : "-";
    }
  };

  return (
    <Box sx={{ mb: { xs: 2 } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          variant="body"
          fontSize={16}
          fontWeight={600}
          mt={0.8}
          display="flex"
        >
          Entry info
        </Typography>
        <IconButton size="micro" onClick={() => setEditMode(true)}>
          <EditIcon />
        </IconButton>
      </Stack>
      <Stack direction="column" gap={1} mt={2}>
        {table_data?.table?.fields?.map((item) => {
          const columnInfo = fieldTypes?.find(
            (element) => item?.type === element?.key
          );

          if (!!columnInfo) {
            return (
              <Stack
                direction="row"
                alignItems="center"
                gap={0.5}
                sx={{ minHeight: 25 }}
              >
                <Typography variant="body2" color="text.secondary">
                  {item?.name}:
                </Typography>
                <Typography variant="body2" noWrap>
                  {!!!columnInfo?.valueFormatter
                    ? columnInfo?.renderCell
                      ? columnInfo?.renderCell(data)
                      : columnRender(
                          item,
                          data[item?.slug] !== undefined
                            ? data[item?.slug]
                            : data,
                          columnInfo
                        )
                    : undefined}
                </Typography>
              </Stack>
            );
          } else {
            return null;
          }
        })}
      </Stack>
      <Divider sx={{ my: 3, display: { xs: "none", md: "block" } }} />
    </Box>
  );
};

export default TableRowEditorPreview;
