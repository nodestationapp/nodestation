import "./styles.scss";

import { useState, useRef } from "react";
import classnames from "classnames";

import useClickOutside from "libs/helpers/useClickOutside";

const mainClass = "dropdown";

const Dropdown = ({ children, button, position, preventChildrenClick }) => {
  const [dropdown_open, setDropdownOpen] = useState(false);
  const ref = useRef();

  useClickOutside(ref, () => setDropdownOpen(false), dropdown_open);

  const openHandler = (e) => {
    if (e.currentTarget !== e.target) setDropdownOpen((prev) => !prev);
  };

  return (
    <div
      ref={ref}
      className={classnames(mainClass, {
        [`${mainClass}--top`]: !!position && position[0] === "top",
        [`${mainClass}--bottom`]: !!position && position[0] === "bottom",
        [`${mainClass}--left`]: !!position && position[1] === "left",
        [`${mainClass}--right`]: !!position && position[1] === "right",
      })}
    >
      <div
        onClick={openHandler}
        className={classnames(`${mainClass}__button`, {
          [`${mainClass}__button--active`]: !!dropdown_open,
        })}
      >
        {button}
      </div>
      {!!dropdown_open && (
        <div
          className={`${mainClass}__content`}
          onClick={() =>
            !!!preventChildrenClick ? setDropdownOpen(false) : null
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
