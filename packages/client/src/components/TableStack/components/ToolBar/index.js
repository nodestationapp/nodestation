import "./styles.scss";

import Filters from "./components/Filters";
import Submenu from "./components/Submenu";
import IconButton from "components/IconButton";

const mainClass = "table__toolbar";

const Toolbar = ({
  view,
  tableId,
  data,
  selectedRows = [],
  filters,
  saveTransaction,
  noEditableView,
  setFilters,
  tableSchema,
  filtersExpanded,
}) => {
  const selectedLength = Object.keys(selectedRows).length;

  return (
    <div className={mainClass}>
      {!!data?.menu && (
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
              <>
                {!!data?.menu && (
                  <Submenu
                    tableId={tableId}
                    data={data?.menu}
                    view={view}
                    noEditableView={data?.noEditableView}
                  />
                )}
              </>
            )}
          </div>
          <div className={`${mainClass}__aside`}>{data?.action}</div>
        </div>
      )}
      {!!filtersExpanded && (
        <Filters
          filters={filters}
          setFilters={setFilters}
          tableSchema={tableSchema}
          saveTransaction={saveTransaction}
        />
      )}
    </div>
  );
};

export default Toolbar;
