import "./styles.scss";
import classnames from "classnames";

import status_chip_colors from "libs/status_chip_colors";

const mainClass = "status-chip";

const StatusChip = ({ status, select_mode }) => {
  const current_chip_color = status_chip_colors(status);

  return (
    <div
      className={classnames(mainClass, `${mainClass}--${current_chip_color}`, {
        [`${mainClass}--select-mode`]: !!select_mode,
      })}
    >
      <span></span>
      <label>{status}</label>
    </div>
  );
};

export default StatusChip;
