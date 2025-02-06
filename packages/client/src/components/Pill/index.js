import "./styles.scss";

const mainClass = "pill";

const Pill = ({ label, onclick, icon }) => {
  return (
    <button onClick={onclick} className={mainClass}>
      {icon}
      {label}
    </button>
  );
};

export default Pill;
