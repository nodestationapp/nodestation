import "./styles.scss";

const mainClass = "splash-screen";

const SplashScreen = () => {
  return (
    <div className={mainClass}>
      <span className={`${mainClass}__loader`}></span>
    </div>
  );
};

export default SplashScreen;
