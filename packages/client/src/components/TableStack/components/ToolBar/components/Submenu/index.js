import "./styles.scss";

import classnames from "classnames";
import { Link, useLocation } from "react-router-dom";

const mainClass = "table__toolbar__menu";

const Submenu = ({ data }) => {
  const { pathname } = useLocation();

  return (
    <div className={mainClass}>
      {data?.map(({ label, href, icon }, index) => (
        <Link
          to={href}
          key={index}
          className={classnames(`${mainClass}__item`, {
            [`${mainClass}__item--active`]: pathname === href,
          })}
        >
          {label}
          {icon}
        </Link>
      ))}

      <div className={`${mainClass}__active-bar`}></div>
    </div>
  );
};

export default Submenu;
