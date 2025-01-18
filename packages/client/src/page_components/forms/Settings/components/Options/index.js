import "./styles.scss";

import { useFormikContext } from "formik";

import OptionsGrid from "components/OptionsGrid";

import status_data from "libs/status_data.json";

import { SignalIcon } from "@heroicons/react/24/outline";

const Options = () => {
  const { values, setFieldValue } = useFormikContext();

  const options_data = [
    [
      {
        icon: <SignalIcon />,
        label: "Status",
        value: values?.status,
        options: status_data,
        onChange: (value) => setFieldValue("status", value),
      },
    ],
  ];

  return (
    <div className="forms-settings-options">
      <OptionsGrid options={options_data} />
    </div>
  );
};

export default Options;
