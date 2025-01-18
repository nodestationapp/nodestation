import "./styles.scss";
import { useEffect, useState } from "react";

const mainClass = "progress-bar";

const ProgressBar = ({ progress, color }) => {
  const [progress_value, setProgressValue] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setProgressValue(progress);
    }, 100);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`${mainClass}`}>
      <div className={`${mainClass}__container`}>
        <div
          className={`${mainClass}__progress`}
          style={{
            width: `${progress_value <= 100 ? progress_value : 100}%`,
            backgroundColor: `rgb(${color})`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
