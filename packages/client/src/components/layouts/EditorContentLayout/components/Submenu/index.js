import "./styles.scss";
import classnames from "classnames";
import { Link, useLocation } from "react-router-dom";

const mainClass = "dashboard-content-layout__submenu";

const Submenu = ({ data, no_padding }) => {
  const { pathname } = useLocation();

  return (
    <div
      className={classnames(mainClass, {
        [`${mainClass}--no-padding`]: !!no_padding,
      })}
    >
      {data?.map(({ label, href }, index) => (
        <Link
          to={href}
          key={index}
          className={classnames(`${mainClass}__item`, {
            [`${mainClass}__item--active`]: pathname === href,
          })}
        >
          {label}
        </Link>
      ))}
      <div className={`${mainClass}__active-bar`}></div>
    </div>
  );
};

export default Submenu;
