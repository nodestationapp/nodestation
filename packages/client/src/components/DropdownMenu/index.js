import "./styles.scss";

import { Link } from "react-router-dom";
import classnames from "classnames";

const mainClass = "dropdown-menu";

const DropdownMenu = ({ items, variant, color }) => {
  return (
    <div
      className={classnames(mainClass, {
        [`${mainClass}--${variant}`]: !!variant,
        [`${mainClass}--${color}`]: !!color,
      })}
    >
      {items?.map(
        ({ icon, color, label, href, onClick, type, disabled }, index) => {
          const content = (
            <>
              {icon}
              {!!color && <span style={{ backgroundColor: color }}></span>}
              {label}
            </>
          );

          const classname = classnames(`${mainClass}__item`, {
            [`${mainClass}__item--${type}`]: !!type,
            [`${mainClass}__item--disabled`]: !!disabled,
          });

          return !!href ? (
            <Link key={index} to={href} className={classname}>
              {content}
            </Link>
          ) : (
            <button
              key={index}
              onClick={onClick}
              className={classname}
              type="button"
            >
              {content}
            </button>
          );
        }
      )}
    </div>
  );
};

export default DropdownMenu;
