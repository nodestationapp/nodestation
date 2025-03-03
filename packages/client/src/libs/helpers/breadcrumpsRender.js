import {
  CircleStackIcon,
  UsersIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

const breadcrumpsRender = (type, tableName) => {
  switch (type) {
    case "auth":
      return [
        {
          icon: <UsersIcon />,
          label: "Authentication",
        },
      ];
    case "forms":
      return [
        {
          icon: <PaperAirplaneIcon />,
          label: "Forms",
          href: "/forms",
        },
        {
          label: tableName,
        },
      ];
    default:
      return [
        {
          icon: <CircleStackIcon />,
          label: "Tables",
        },
        {
          label: tableName,
        },
      ];
  }
};

export default breadcrumpsRender;
