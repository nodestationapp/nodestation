import "./styles.scss";

import { Sparklines, SparklinesLine } from "react-sparklines";

const mainClass = "table__email-sparklines";

const EmailSparklines = ({ data }) => {
  const metrics = data?.metrics;

  const success_week = metrics?.reduce((a, b) => a + b?.success, 0);
  const errors_week = metrics?.reduce((a, b) => a + b?.errors, 0);

  let highest_success = Math.max(...metrics?.map((item) => item?.success));
  let highest_errors = Math.max(...metrics?.map((item) => item?.errors));

  return (
    <div className={mainClass}>
      {success_week > 0 && (
        <Sparklines
          max={
            highest_errors > highest_success ? highest_errors : highest_success
          }
          data={[0, ...metrics?.map((item) => item?.success)]}
        >
          <SparklinesLine color="#00FFEB" />
        </Sparklines>
      )}
      {errors_week > 0 && (
        <Sparklines
          max={
            highest_success > highest_errors ? highest_success : highest_errors
          }
          data={[0, ...metrics?.map((item) => item?.errors)]}
        >
          <SparklinesLine color="#FF4545" />
        </Sparklines>
      )}
    </div>
  );
};

export default EmailSparklines;
