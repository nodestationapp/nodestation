import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import MuiTable from "@nstation/tables/client/components/MuiTable/index.js";

import EmailEditorModal from "#client/components/EmailEditorModal.js";
import { useEmails } from "#client/contexts/emails.js";

import AddIcon from "@mui/icons-material/Add";
import Settings from "@mui/icons-material/Settings";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

import { useUpdateQueryParam } from "@nstation/design-system/hooks";

const Emails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const updateQueryParam = useUpdateQueryParam();

  const { emails, email_settings, loading, deleteEmail, sort } = useEmails();
  const [email_editor_modal, setEmailEditorModal] = useState(false);

  const deleteHandler = async (ids) => {
    try {
      for await (const id of ids) {
        await deleteEmail(id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sortHandler = (sort) => {
    updateQueryParam(
      "sort",
      !!sort?.length ? `${sort?.[0]?.field}:${sort?.[0]?.sort}` : undefined
    );
  };

  const action = () => (
    <>
      <IconButton size="micro" onClick={() => navigate(`${pathname}/settings`)}>
        <Settings />
      </IconButton>
      {process.env.NODE_ENV === "development" && (
        <Button
          size="small"
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setEmailEditorModal(true)}
        >
          New
        </Button>
      )}
    </>
  );

  const selectActions = (selectedRows) => {
    return (
      <Tooltip title="Delete">
        <IconButton size="micro" onClick={() => deleteHandler(selectedRows)}>
          <DeleteOutline sx={{ color: "error.light" }} />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <>
      {!!email_settings && !email_settings?.providers_count && (
        <Alert
          severity="info"
          sx={{ mb: 2 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => navigate(`${pathname}/settings`)}
            >
              Configure
            </Button>
          }
        >
          To send email messages, you must first configure your settings.
        </Alert>
      )}
      <MuiTable
        page={1}
        views={[
          {
            name: "Emails",
            href: "/emails",
          },
        ]}
        sort={
          !!sort
            ? [
                {
                  field: sort?.split(":")[0],
                  sort: sort?.split(":")[1],
                },
              ]
            : null
        }
        setSort={sortHandler}
        action={action}
        loading={loading}
        noAddTab
        columns={[
          {
            flex: 1,
            field: "name",
            headerName: "Name",
            renderCell: (params) => params?.value,
          },
        ]}
        rows={emails?.data}
        selectActions={selectActions}
        pagination={emails?.meta}
        onRowClick={({ row }) => setEmailEditorModal(row)}
      />
      {email_editor_modal && (
        <EmailEditorModal
          open={email_editor_modal}
          onClose={() => setEmailEditorModal(false)}
        />
      )}
    </>
    // <TableManager
    //   table="nodestation_users"
    //   onEntrySubmit={onEntrySubmit}
    //   appendColumns={[
    //     {
    //       name: "User",
    //       sort: "first_name",
    //       type: "user_profile",
    //       slug: "user",
    //       origin: "system",
    //     },
    //   ]}
    //   hiddenColumns={["password", "first_name", "last_name", "photo"]}
    // />
  );
};

export default Emails;
