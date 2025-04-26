import MimeType from "./components/MimeType.js";
import MediaSize from "./components/MediaSize.js";
import TableManager from "components/TableManager";

const Media = () => {
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
    <TableManager
      rowFullWidth
      rowHeight={60}
      table="nodestation_media"
      appendColumns={appendColumns}
      hiddenColumns={["name", "url", "type", "size"]}
    />
  );
};

export default Media;
