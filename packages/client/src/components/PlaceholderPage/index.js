import "./styles.scss";
import Button from "components/Button";

const mainClass = "placeholder-page";

const PlaceholderPage = ({ icon, header, sub_header, action }) => {
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__wrapper`}>
        <div className={`${mainClass}__wrapper__header`}>
          {icon}
          <h1>{header}</h1>
          <span>{sub_header}</span>
        </div>
        {!!action && <Button href={action?.href}>{action?.label}</Button>}
      </div>
    </div>
  );
};

export default PlaceholderPage;
