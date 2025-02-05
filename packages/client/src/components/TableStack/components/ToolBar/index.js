import "./styles.scss";

import Submenu from "./components/Submenu";
import IconButton from "components/IconButton";

const mainClass = "table__toolbar";

const Toolbar = ({ data, selectedRows = [] }) => {
  const selectedLength = Object.keys(selectedRows).length;

  console.log(data);

  return (
    <div className={mainClass}>
      <div className={`${mainClass}__content`}>
        <div className={`${mainClass}__main`}>
          {!!selectedLength > 0 ? (
            <div className={`${mainClass}__main__select-action`}>
              <span className="small">Selected {selectedLength}</span>
              <div className={`${mainClass}__main__select-action__options`}>
                {data?.selectAction?.map((item, index) => {
                  if (!!!item?.icon) return null;
                  return (
                    <IconButton
                      key={index}
                      size="small"
                      icon={item?.icon}
                      onClick={item?.onClick}
                    />
                  );
                })}
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
