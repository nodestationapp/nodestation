import "./styles.scss";

const mainClass = "table__no-items-found";

const NoItemsFound = () => {
  return (
    <div className={mainClass}>
      <span>No items found</span>
    </div>
  );
};

export default NoItemsFound;
