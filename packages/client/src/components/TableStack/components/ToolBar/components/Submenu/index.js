import "./styles.scss";

import classnames from "classnames";
import { Link, useLocation } from "react-router-dom";

import IconButton from "components/IconButton";
import { PlusIcon } from "@heroicons/react/24/outline";

const mainClass = "table__toolbar__menu";

const Submenu = ({ data, onAddView }) => {
  const { pathname, search } = useLocation();

  const currentPathname = pathname + search;

  return (
    <div className={mainClass}>
      {data?.map(({ label, href, icon, variant }, index) => {
        const Component = href ? Link : "span";

        return (
          <Component
            to={href}
            key={index}
            className={classnames(`${mainClass}__item`, {
              [`${mainClass}__item--active`]:
                currentPathname === href || variant === "label",
            })}
          >
            {label}
            {icon}
          </Component>
        );
      })}
      {!!onAddView && (
        <IconButton onClick={onAddView} size="small" icon={<PlusIcon />} />
      )}
    </div>
  );
};

export default Submenu;
