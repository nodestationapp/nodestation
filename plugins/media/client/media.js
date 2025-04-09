import { Photo } from "@mui/icons-material";

import useSetBreadcrumbs from "hooks/useSetBreadcrumbs";

import TableManager from "components/TableManager";

const Media = () => {
  useSetBreadcrumbs([
    {
      icon: Photo,
      label: "Media",
    },
  ]);

  return <TableManager table="nodestation_media" />;
};

export default Media;
