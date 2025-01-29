import { ReactComponent as IdIcon } from "assets/icons/content-types/id.svg";
import { ReactComponent as JsonIcon } from "assets/icons/content-types/json.svg";
import { ReactComponent as DateIcon } from "assets/icons/content-types/date.svg";
import { ReactComponent as MediaIcon } from "assets/icons/content-types/media.svg";
import { ReactComponent as NumericIcon } from "assets/icons/content-types/number.svg";
import { ReactComponent as BooleanIcon } from "assets/icons/content-types/boolean.svg";
import { ReactComponent as LongTextIcon } from "assets/icons/content-types/long-text.svg";
import { ReactComponent as ShortTextIcon } from "assets/icons/content-types/short-text.svg";
import { ReactComponent as EnumerationIcon } from "assets/icons/content-types/enumeration.svg";

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
    icon: <EnumerationIcon />,
    label: "Enumeration",
    value: "enumeration",
  },
  {
    icon: <NumericIcon />,
    label: "Number",
    value: "numeric",
  },
  {
    icon: <MediaIcon />,
    label: "Media",
    value: "media",
  },
  {
    icon: <JsonIcon />,
    label: "Json",
    value: "json",
  },
  {
    icon: <DateIcon />,
    label: "Date",
    value: "date",
  },
];

export default field_type_data;
