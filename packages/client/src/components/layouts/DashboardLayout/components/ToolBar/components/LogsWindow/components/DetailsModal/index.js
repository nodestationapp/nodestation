import "./styles.scss";
import "react-perfect-scrollbar/dist/css/styles.css";

import cx from "classnames";
import ReactJsonView from "@microlink/react-json-view";
import AsideModal from "components/AsideModal";

import {
  InformationCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";

const mainClass = "logs-window";

const value_render = ({ label, type, value }) => {
  switch (type) {
    case "text":
    case "email":
    case "select":
      return <span>{value?.toString()}</span>;
    case "json":
      return (
        <ReactJsonView
          src={value}
          name={label}
          theme="ocean"
          enableClipboard={false}
          displayDataTypes={false}
          shouldCollapse={({ src }) => {
            return typeof src === "object" && Object.keys(src).length > 6;
          }}
        />
      );
    default:
      return "";
  }
};

const DetailsModal = ({ data, onClose }) => {
  const details_data = [
    {
      label: "General",
      icon: <InformationCircleIcon />,
      items: [
        {
          type: "text",
          label: "Request URL",
          value: data?.source?.path,
        },
        {
          type: "text",
          label: "Method",
          value: data?.req?.method,
        },
        {
          type: "text",
          label: "Status Code",
          value: data?.res?.status,
        },
        {
          type: "text",
          label: "Response Time",
          value: `${data?.responseTime} ms`,
        },
      ],
    },
    {
      label: "Request",
      icon: <ArrowTrendingUpIcon />,
      items: [
        {
          type: "json",
          label: "Body",
          value: data?.req?.body,
        },
        {
          type: "json",
          label: "Headers",
          value: data?.req?.headers,
        },
      ],
    },
    {
      label: "Response",
      icon: <ArrowTrendingDownIcon />,
      items: [
        {
          type: "json",
          label: "Body",
          value: data?.res?.body,
        },
      ],
    },
  ];

  return (
    <AsideModal onClose={onClose}>
      <div className={`${mainClass}__details`}>
        {details_data?.map((item, index) => (
          <div key={index} className={`${mainClass}__details__section`}>
            <strong className="light">
              {item?.icon} {item?.label}
            </strong>
            <div className={`${mainClass}__details__section__content`}>
              {item?.items?.map((element, index) => (
                <div
                  key={index}
                  className={cx(
                    `${mainClass}__details__section__content__item`,
                    {
                      [`${mainClass}__details__section__content__item--vertical`]:
                        element?.variant === "long" || element?.type === "json",
                    }
                  )}
                >
                  {element?.type !== "json" && <span>{element?.label}:</span>}
                  {value_render({
                    label: element?.label,
                    type: element?.type,
                    value: element?.value,
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AsideModal>
  );
};

export default DetailsModal;
