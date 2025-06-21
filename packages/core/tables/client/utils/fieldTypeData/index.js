import IdIcon from "#client/icons/id.svg";
import JsonIcon from "#client/icons/json.svg";
import DateIcon from "#client/icons/date.svg";
import UserIcon from "#client/icons/user.svg";
import MediaIcon from "#client/icons/media.svg";
import NumericIcon from "#client/icons/number.svg";
import BooleanIcon from "#client/icons/boolean.svg";
import ShortTextIcon from "#client/icons/short-text.svg";
import EnumerationIcon from "#client/icons/enumeration.svg";

import IdExtraFields from "#client/utils/fieldTypeData/components/Id.js";
import TextExtraFields from "#client/utils/fieldTypeData/components/Text.js";
import JsonExtraFields from "#client/utils/fieldTypeData/components/Json.js";
import DateExtraFields from "#client/utils/fieldTypeData/components/Date.js";
import NumericExtraFields from "#client/utils/fieldTypeData/components/Numeric.js";
import BooleanExtraFields from "#client/utils/fieldTypeData/components/Boolean.js";
import SelectExtraFields from "#client/utils/fieldTypeData/components/Select/index.js";

import JsonColumn from "#client/utils/fieldTypeData/columnRender/Json.js";
import DateColumn from "#client/utils/fieldTypeData/columnRender/Date.js";
import MediaColumn from "#client/utils/fieldTypeData/columnRender/Media.js";
import SelectColumn from "#client/utils/fieldTypeData/columnRender/Select.js";
import BooleanColumn from "#client/utils/fieldTypeData/columnRender/Boolean.js";
import UserColumn from "#client/utils/fieldTypeData/columnRender/UserProfile.js";

export default [
  {
    key: "id",
    label: "ID",
    value: "id",
    icon: <IdIcon />,
    extraFields: (props) => <IdExtraFields {...props} />,
  },
  {
    key: "text",
    label: "Text",
    icon: <ShortTextIcon />,
    extraFields: (props) => <TextExtraFields {...props} />,
  },
  {
    key: "boolean",
    label: "Boolean",
    icon: <BooleanIcon />,
    extraFields: (props) => <BooleanExtraFields {...props} />,
    columnRender: (props) => <BooleanColumn {...props} />,
  },
  {
    key: "select",
    label: "Select",
    icon: <EnumerationIcon />,
    extraFields: (props) => <SelectExtraFields {...props} />,
    columnRender: (props) => <SelectColumn {...props} />,
  },
  {
    key: "numeric",
    label: "Number",
    icon: <NumericIcon />,
    extraFields: (props) => <NumericExtraFields {...props} />,
  },
  {
    key: "media",
    label: "Media",
    icon: <MediaIcon />,
    columnRender: (props) => <MediaColumn {...props} />,
  },
  {
    key: "user",
    label: "User",
    icon: <UserIcon />,
    columnRender: (props) => <UserColumn {...props} />,
  },
  {
    key: "json",
    label: "Json",
    icon: <JsonIcon />,
    extraFields: (props) => <JsonExtraFields {...props} />,
    columnRender: (props) => <JsonColumn {...props} />,
  },
  {
    key: "date",
    label: "Date",
    icon: <DateIcon />,
    extraFields: (props) => <DateExtraFields {...props} />,
    columnRender: (props) => <DateColumn {...props} />,
  },
];
