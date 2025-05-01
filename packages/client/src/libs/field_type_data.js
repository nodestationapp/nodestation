import IdIcon from "assets/icons/content-types/id.svg";
import JsonIcon from "assets/icons/content-types/json.svg";
import DateIcon from "assets/icons/content-types/date.svg";
import UserIcon from "assets/icons/content-types/user.svg";
import MediaIcon from "assets/icons/content-types/media.svg";
import NumericIcon from "assets/icons/content-types/number.svg";
import BooleanIcon from "assets/icons/content-types/boolean.svg";
import ShortTextIcon from "assets/icons/content-types/short-text.svg";
import EnumerationIcon from "assets/icons/content-types/enumeration.svg";

const field_type_data = [
  {
    icon: <IdIcon />,
    label: "ID",
    value: "id",
  },
  {
    icon: <ShortTextIcon />,
    label: "Text",
    value: "text",
  },
  {
    icon: <BooleanIcon />,
    label: "Boolean",
    value: "boolean",
  },
  {
    icon: <EnumerationIcon />,
    label: "Select",
    value: "select",
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
    icon: <UserIcon />,
    label: "User",
    value: "user",
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
