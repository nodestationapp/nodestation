import "./styles.scss";

const mainClass = "title-bar";

const TitleBar = ({ title }) => {
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__left`}></div>
      <span>{title || "New template"}</span>
      <div className={`${mainClass}__right`}></div>
    </div>
  );
};

export default TitleBar;
