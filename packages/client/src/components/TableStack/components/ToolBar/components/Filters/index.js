import "./styles.scss";

import FilterItem from "./components/FilterItem";

const mainClass = "table__filters";

const Filters = ({ saveTransaction, filters, setFilters, tableSchema }) => {
  const onRemoveHandler = (field) => {
    let temp = [...filters];

    const index = temp?.findIndex((item) => item?.field === field);
    if (temp?.length === 1) {
      temp[index] = {
        field: null,
        value: null,
      };
    } else {
      temp.splice(index, 1);
    }
    setFilters(temp);
    saveTransaction({ filters: temp });
  };

  return (
    <div className={mainClass}>
      {filters?.map((item, index) => (
        <FilterItem
          key={index}
          data={item}
          index={index}
          filters={filters}
          columns={tableSchema}
          setFilters={setFilters}
          onRemove={onRemoveHandler}
          saveTransaction={saveTransaction}
        />
      ))}
    </div>
  );
};

export default Filters;
