import "./styles.scss";

const mainClass = "table__new-message-name";

const NewMessageName = ({ data }) => {
  return (
    <div className={mainClass}>
      {!!!data?.is_read && <div className={`${mainClass}__badge`}></div>}
      <span>{data?.value}</span>
    </div>
  );
};

export default NewMessageName;
