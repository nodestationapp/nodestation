import "./styles.scss";

import { useState } from "react";

import LogsWindow from "./components/LogsWindow";

import { useApp } from "context/app";

import { ListBulletIcon } from "@heroicons/react/24/outline";

const mainClass = "dashboard-layout-status-bar";

const ToolBar = () => {
  const { logs_count } = useApp();

  const [logs, setLogs] = useState(false);

  return (
    <>
      <div className={mainClass}>
        <div className={`${mainClass}__col`}></div>
        <div className={`${mainClass}__col`}>
          <button
            onClick={() => setLogs(true)}
            className={`${mainClass}__col__button ${
              !!logs_count ? "active" : ""
            }`}
          >
            <ListBulletIcon />
            Logs
          </button>
        </div>
      </div>
      {!!logs && <LogsWindow onClose={() => setLogs(false)} />}
    </>
  );
};

export default ToolBar;
