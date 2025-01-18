import "./styles.scss";

import { useState } from "react";
import classnames from "classnames";

const mainClass = "tooltip";

const Tooltip = ({ children, text, variant, position }) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={classnames(mainClass, {
        [`${mainClass}--${variant}`]: !!variant,
        [`${mainClass}--${position}`]: !!position,
      })}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {children}
      {active && (
        <div className={`${mainClass}__content`}>
          <span>{text}</span>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
