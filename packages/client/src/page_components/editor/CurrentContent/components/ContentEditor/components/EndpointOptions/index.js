import { useFormikContext } from "formik";

import OptionsGrid from "components/OptionsGrid";

import status_data from "libs/status_data.json";
import parser_data from "libs/parser_data.json";

import { useEditor } from "context/client/editor";

import {
  SignalIcon,
  ShieldCheckIcon,
  CodeBracketIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const EndpointOptions = () => {
  const { editor, settings } = useEditor();

  const { values, setFieldValue } = useFormikContext();

  const auth_options = settings?.fields
    ?.find((item) => item?.slug === "type")
    ?.options?.split("\n")
    ?.map((item) => ({ label: item, value: item }));

  const mid_options = editor
    ?.filter((item) => item?.type === "mid")
    ?.map((item) => ({ label: item?.name, value: item?.id }));

  const options_data = [
    [
      {
        icon: <SignalIcon />,
        label: "Status",
        value: values?.status,
        options: status_data,
        onChange: (value) => setFieldValue("status", value),
      },
      {
        icon: <LockClosedIcon />,
        label: "Authentication",
        value: values?.options?.auth,
        multi: true,
        options: auth_options,
        onChange: (value) => setFieldValue("options.auth", value),
      },
      {
        icon: <CodeBracketIcon />,
        label: "Parser",
        value: values?.options?.parser,
        options: parser_data,
        onChange: (value) => setFieldValue("options.parser", value),
      },
      {
        type: "drag-order",
        icon: <ShieldCheckIcon />,
        label: "Middlewares",
        value: values?.options?.middlewares,
        options: mid_options,
        onChange: (value) => setFieldValue("options.middlewares", value),
      },
    ],
  ];

  return <OptionsGrid options={options_data} />;
};

export default EndpointOptions;
