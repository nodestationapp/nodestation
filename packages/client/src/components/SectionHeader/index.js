import "./styles.scss";

const mainClass = "section-header";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className={mainClass}>
      <h1>{title}</h1>
      <span>{subtitle}</span>
    </div>
  );
};

export default SectionHeader;
