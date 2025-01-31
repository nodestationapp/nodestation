import "./styles.scss";

import Submenu from "./components/Submenu";
import IconButton from "components/IconButton";

import { useTableWrapper } from "context/client/table-wrapper";

const mainClass = "table__toolbar";

const Toolbar = ({ data }) => {
  const { selectedRows } = useTableWrapper();

  return (
    <div className={mainClass}>
      <div className={`${mainClass}__content`}>
        <div className={`${mainClass}__main`}>
          {!!selectedRows?.length ? (
            <div className={`${mainClass}__main__select-action`}>
              <span className="small">Selected {selectedRows?.length}</span>
              <div className={`${mainClass}__main__select-action__options`}>
                {data?.selectAction?.map((item, index) => (
                  <IconButton
                    key={index}
                    size="small"
                    icon={item?.icon}
                    onClick={() => item?.onClick(selectedRows)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>{!!data?.menu && <Submenu data={data?.menu} />}</>
          )}
        </div>
        <div className={`${mainClass}__aside`}>{data?.action}</div>
      </div>
    </div>
  );
};

export default Toolbar;
