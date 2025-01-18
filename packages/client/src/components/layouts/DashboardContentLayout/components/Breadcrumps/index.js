import "./styles.scss";
import { Link } from "react-router-dom";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import BreadcrumpSkeleton from "./components/BreadcrumpSkeleton";

const mainClass = "dashboard-content-layout__breadcrumps";

const Breadcrumps = ({ data, loading }) => {
  return (
    <div className={mainClass}>
      {data?.map(({ icon, label, href }, index) => {
        if (!!loading && index > 1) return null;

        return (
          <div key={index} className={`${mainClass}__section`}>
            <div key={index} className={`${mainClass}__section__separator`}>
              <ChevronRightIcon />
            </div>
            {index !== 0 && !!loading && !!!label ? (
              <BreadcrumpSkeleton />
            ) : !!href ? (
              <Link to={href} className={`${mainClass}__section__item`}>
                {icon} <span>{label}</span>
              </Link>
            ) : (
              <span className={`${mainClass}__section__item`}>
                {icon} <span>{label}</span>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumps;
