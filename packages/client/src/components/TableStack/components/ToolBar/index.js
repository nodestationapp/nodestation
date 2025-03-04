import "./styles.scss";

import Filters from "./components/Filters";
import Submenu from "./components/Submenu";
import IconButton from "components/IconButton";
import AddTableViewModal from "./components/AddTableViewModal";
import { useState } from "react";

const mainClass = "table__toolbar";

const Toolbar = ({
  tableId,
  data,
  selectedRows = [],
  filters,
  saveTransaction,
  setFilters,
  tableSchema,
  filtersExpanded,
}) => {
  const [view_modal, setViewModal] = useState(false);
  const selectedLength = Object.keys(selectedRows).length;

  const onAddView = () => {
    setViewModal(true);
  };

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
                  <Submenu data={data?.menu} onAddView={onAddView} />
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
      {!!view_modal && (
        <AddTableViewModal
          tableId={tableId}
          onClose={() => setViewModal(false)}
        />
      )}
    </div>
  );
};

export default Toolbar;
