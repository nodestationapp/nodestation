import { useState } from "react";

import MimeType from "./components/MimeType.js";
import MediaSize from "./components/MediaSize.js";
import TableManager from "@nstation/core/tables/client/components/TableManager/index.js";
import UploadDialog from "./components/UploadDialog/index.js";

const Media = () => {
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

  return (
    <>
      <TableManager
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
      />
    </>
  );
};

export default Media;
