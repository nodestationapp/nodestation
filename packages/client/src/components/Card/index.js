import "./styles.scss";

const mainClass = "card";

const Card = ({ title, children }) => {
  return (
    <div className={mainClass}>
      {!!title && (
        <div className={`${mainClass}__header`}>
          <h2>{title}</h2>
        </div>
      )}
      <div className={`${mainClass}__content`}>{children}</div>
    </div>
  );
};

export default Card;
