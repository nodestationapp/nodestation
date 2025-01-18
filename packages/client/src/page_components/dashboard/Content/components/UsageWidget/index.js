import "./styles.scss";

import Card from "components/Card";
import ProgressBar from "components/ProgressBar";

import { useDashboard } from "context/client/dashboard";
import { CpuChipIcon, CircleStackIcon } from "@heroicons/react/24/outline";

const mainClass = "usage-widget";

const UsageWidget = () => {
  const { system_metrics } = useDashboard();

  const usage_data = [
    {
      icon: <CpuChipIcon />,
      color: "115,104,240",
      label: "CPU",
      value: system_metrics?.[0]?.cpu?.toFixed(1),
      prefix: "%",
    },
    {
      icon: <CpuChipIcon />,
      color: "0,186,210",
      label: "Memory",
      value: system_metrics?.[0]?.memory,
      prefix: "%",
    },
    {
      icon: <CircleStackIcon />,
      color: "255,77,81",
      label: "Storage",
      value: system_metrics?.[0]?.storage,
      prefix: "%",
    },
  ];

  return (
    <Card title="System usage">
      <div className={mainClass}>
        {usage_data?.map((item, index) => (
          <div key={index} className={`${mainClass}__item`}>
            <div className={`${mainClass}__item__label`}>
              <div
                style={{
                  color: `rgb(${item?.color})`,
                  backgroundColor: `rgba(${item?.color}, 0.18)`,
                }}
                className={`${mainClass}__item__label__icon`}
              >
                {item?.icon}
              </div>
              <span>{item?.label}</span>
            </div>
            <span className={`${mainClass}__item__value`}>
              {item?.value}
              {item?.prefix}
            </span>
            <ProgressBar color={item?.color} progress={item?.value} />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UsageWidget;
