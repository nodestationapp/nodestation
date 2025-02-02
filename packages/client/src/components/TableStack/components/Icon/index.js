import "./styles.scss";

import cx from "classnames";
import { LockClosedIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const mainClass = "table__icon";

const getIcon = (data, slug) => {
  switch (slug) {
    case "authentication":
      return {
        active: !!data?.options?.auth?.length,
        icon: <LockClosedIcon />,
      };
    case "middlewares":
      return {
        active: !!data?.options?.middlewares?.length,
        icon: <ShieldCheckIcon />,
      };
    default:
      return null;
  }
};

const Icon = ({ data, meta }) => {
  const icon = getIcon(data, meta?.slug);

  return (
    <div
      className={cx(mainClass, {
        [`${mainClass}--disabled`]: !!!icon?.active,
      })}
    >
      {icon?.icon}
    </div>
  );
};

export default Icon;
