import "./styles.scss";

import cx from "classnames";

import { CheckBadgeIcon } from "@heroicons/react/24/solid";

const mainClass = "server-control";

const button_label_render = (status) => {
  switch (status) {
    case 1:
      return "Server is starting…";
    case 2:
      return "Healthy";
    case 3:
      return "Syncing…";
    case 4:
      return "Error occurred";
    default:
      return "Server paused";
  }
};

const ServerControl = () => {
  const server = { status: 2 };

  return (
    <div
      className={cx(mainClass, {
        [`${mainClass}--${server?.status}`]: !!server?.status,
      })}
    >
      <div className={`${mainClass}__left`}>
        <div className={`${mainClass}__left__icon`}>
          <CheckBadgeIcon />
        </div>
        <span>{button_label_render(server?.status)}</span>
      </div>
    </div>
  );
};

export default ServerControl;
