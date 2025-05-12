import { useState } from "react";

import { Button, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import MimeType from "./components/MimeType.js";
import MediaSize from "./components/MediaSize.js";
import TableManager from "@nstation/core/tables/client/components/TableManager/index.js";
import UploadDialog from "./components/UploadDialog/index.js";
import { BaseLayout } from "@nstation/design-system/Layouts";
import UploadedItems from "./components/UploadDialog/UploadedItems.js";
import { useMedia } from "./contexts/media.js";
import { useNavigate } from "react-router-dom";
import Settings from "@mui/icons-material/Settings";

const Media = () => {
  const navigate = useNavigate();
  const { media, deleteFile } = useMedia();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const appendColumns = [
    {
      key: "media",
      name: "Name",
      slug: "media",
      type: "media",
    },
    {
      key: "typer",
      name: "Type",
      slug: "type",
      renderCell: (params) => {
        return <MimeType data={params?.value} />;
      },
    },
    {
      key: "size",
      name: "Size",
      slug: "size",
      renderCell: (params) => {
        return <MediaSize size={params?.value} />;
      },
    },
  ];

  const tabs = [
    {
      title: "Media",
      href: "/media",
    },
  ];

  return (
    <BaseLayout
      tabs={tabs}
      action={() => (
        <>
          <IconButton size="micro" onClick={() => navigate(`/media/settings`)}>
            <Settings />
          </IconButton>
          <Button
            size="small"
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setUploadDialogOpen(true)}
          >
            New
          </Button>
        </>
      )}
    >
      <UploadedItems files={media} percent={[]} onDelete={deleteFile} />
      <UploadDialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
      />
      {/* <TableManager
        rowFullWidth
        rowHeight={60}
        table="nodestation_media"
        onNewClick={() => setUploadDialogOpen(true)}
        appendColumns={appendColumns}
        hiddenColumns={["name", "url", "type", "size"]}
      />
      <UploadDialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
      /> */}
    </BaseLayout>
  );
};

export default Media;
