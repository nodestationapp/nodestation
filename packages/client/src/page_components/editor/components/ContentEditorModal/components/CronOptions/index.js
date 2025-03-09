import { useFormikContext } from "formik";
import { isValidCron } from "cron-validator";

import OptionsGrid from "components/OptionsGrid";

import status_data from "libs/status_data.json";
import timezone_data from "libs/timezone_data.json";

import {
  SignalIcon,
  ClockIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const CronOptions = () => {
  const { values, setFieldValue } = useFormikContext();

  const options_data = [
    [
      {
        type: "select",
        label: "Status",
        icon: <SignalIcon />,
        options: status_data,
        value: values?.status,
        onChange: (value) => setFieldValue("status", value),
      },
      {
        type: "dropdown-input",
        label: "Schedule",
        icon: <ClockIcon />,
        validate: isValidCron,
        value: values?.options?.schedule,
        onChange: (value) => setFieldValue("options.schedule", value),
      },
      {
        type: "select",
        label: "Timezone",
        icon: <GlobeAltIcon />,
        options: timezone_data,
        value: values?.options?.timezone,
        onChange: (value) => setFieldValue("options.timezone", value),
      },
    ],
  ];

  return <OptionsGrid options={options_data} />;
};

export default CronOptions;
