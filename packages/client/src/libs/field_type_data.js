import { ReactComponent as FileIcon } from "assets/icons/file.svg";
import { ReactComponent as IdIcon } from "assets/icons/uuid.svg";
import { ReactComponent as JsonIcon } from "assets/icons/json.svg";
import { ReactComponent as NumericIcon } from "assets/icons/numeric.svg";
import { ReactComponent as BooleanIcon } from "assets/icons/boolean.svg";
import { ReactComponent as LongTextIcon } from "assets/icons/long-text.svg";
import { ReactComponent as ShortTextIcon } from "assets/icons/short-text.svg";

const field_type_data = [
  {
    icon: <IdIcon />,
    label: "ID",
    value: "id",
  },
  {
    icon: <ShortTextIcon />,
    label: "Short text",
    value: "short_text",
  },
  {
    icon: <LongTextIcon />,
    label: "Long text",
    value: "long_text",
  },
  {
    icon: <BooleanIcon />,
    label: "Boolean",
    value: "boolean",
  },
  {
    icon: <LongTextIcon />,
    label: "Enumeration",
    value: "enumeration",
  },
  {
    icon: <NumericIcon />,
    label: "Number",
    value: "numeric",
  },
  {
    icon: <FileIcon />,
    label: "Media",
    value: "media",
  },
  {
    icon: <JsonIcon />,
    label: "Json",
    value: "json",
  },
  {
    icon: <JsonIcon />,
    label: "Date",
    value: "date",
  },
];

export default field_type_data;
