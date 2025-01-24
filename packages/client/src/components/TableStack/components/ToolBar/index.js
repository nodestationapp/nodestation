import "./styles.scss";

const mainClass = "table__toolbar";

const Toolbar = ({ count, data }) => {
  return (
    <div className={mainClass}>
      <span>Selected {count} items</span>
      {data}
    </div>
  );
};

export default Toolbar;
