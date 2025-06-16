import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TableManager from "@nstation/tables/client/components/TableManager/index.js";
import MuiTable from "@nstation/tables/client/components/MuiTable/index.js";

const CustomButton = styled(Button)(({ theme }) => ({
  padding: "0 8px",
  height: "100%",
  borderRadius: 0,
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
  gap: 5,
  fontSize: 13,
  color: "#88fc85 !important",
}));

const Logger = () => {
  return (
    <>
      <CustomButton>
        <ListOutlinedIcon sx={{ height: 16, width: 16 }} />
        Logs
      </CustomButton>
      <Card
        sx={{
          height: 340,
          position: "fixed",
          left: 262,
          right: 24,
          bottom: 59,
          p: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 42,
            px: 2,
          }}
        >
          <Typography variant="body">Logs</Typography>
          <IconButton size="micro" sx={{ marginRight: -0.8 }}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <Divider />
        <MuiTable
          page={1}
          hideToolbar
          // action={action}
          // loading={loading}
          noAddTab
          columns={[
            {
              flex: 1,
              field: "name",
              headerName: "Name",
              // renderCell: (params) => params?.value,
            },
          ]}
          rows={[{ id: 1 }]}
          // selectActions={selectActions}
          pagination={{
            count: 1,
            pageSize: 10,
          }}
          // onRowClick={({ row }) => setEmailEditorModal(row)}
        />
      </Card>
    </>
  );
};

export default Logger;
