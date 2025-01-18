import "./styles.scss";
import Loader from "components/Loader";

const mainClass = "startup-loader";

const StartupLoader = () => {
  return (
    <div className={mainClass}>
      <Loader size="large" />
      {/* <span>Building project</span> */}
    </div>
  );
};

export default StartupLoader;
