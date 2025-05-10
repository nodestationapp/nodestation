import IdIcon from "../icons/id.svg";
import JsonIcon from "../icons/json.svg";
import DateIcon from "../icons/date.svg";
import UserIcon from "../icons/user.svg";
import MediaIcon from "../icons/media.svg";
import NumericIcon from "../icons/number.svg";
import BooleanIcon from "../icons/boolean.svg";
import ShortTextIcon from "../icons/short-text.svg";
import EnumerationIcon from "../icons/enumeration.svg";

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
