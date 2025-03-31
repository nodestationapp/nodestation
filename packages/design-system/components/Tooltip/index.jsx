import "./styles.scss";

import { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const mainClass = "tooltip";

const Tooltip = ({ children, text, position }) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={classnames(mainClass, {
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

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  position: PropTypes.oneOf(["bottom", "right"]),
};
