import "./styles.scss";
import "react-perfect-scrollbar/dist/css/styles.css";

import cx from "classnames";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

import Tooltip from "components/Tooltip";
import KeyViewer from "components/KeyViewer";
import IconButton from "components/IconButton";
import TableStack from "components/TableStack";
import DetailsModal from "./components/DetailsModal";

import api from "libs/api";

import { useApp } from "context/app";
import LogsProvider, { useLogs } from "context/client/logs";

import {
  XMarkIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";

const mainClass = "logs-window";

const LogsWindowContent = ({ onClose }) => {
  const { getUserData } = useApp();
  const { logs, fetchNextPage } = useLogs();
  const [cookies, setCookie] = useCookies(["logs_maximize"]);

  const [details_modal, setDetailsModal] = useState(null);

  const onCloseHandler = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const onMaximizeToggle = () => {
    setCookie("logs_maximize", !!!cookies?.logs_maximize);
  };

  useEffect(() => {
    document.addEventListener("keydown", onCloseHandler);
    return () => {
      document.removeEventListener("keydown", onCloseHandler);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await api.put(`/logs/read-all`);
        await getUserData(cookies?.access_token);
      } catch (err) {
        console.error(err);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      key: "level",
      slug: "level",
      type: "level",
      width: 40,
    },
    {
      key: "log_source",
      value: "Source",
      slug: "log_source",
      type: "log_source",
      width: 200,
    },
    {
      key: "log_created_at",
      value: "Date",
      slug: "created_at",
      type: "date",
      width: 250,
    },
    {
      key: "details",
      value: "Message",
      slug: "message",
      type: "log_message",
    },
  ];

  const handleScroll = ({ scrollTop, scrollHeight, clientHeight }) => {
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      fetchNextPage();
    }
  };

  return (
    <div
      className={cx(mainClass, {
        [`${mainClass}--maximize`]: !!cookies?.logs_maximize,
      })}
    >
      <div className={`${mainClass}__header`}>
        <span>Logs</span>
        <div className={`${mainClass}__header__actions`}>
          <IconButton
            onClick={onMaximizeToggle}
            size="small"
            icon={
              !!!cookies?.logs_maximize ? (
                <ArrowsPointingOutIcon />
              ) : (
                <ArrowsPointingInIcon />
              )
            }
          />
          <Tooltip text={<KeyViewer variant="dark" no_margin data={["Esc"]} />}>
            <IconButton onClick={onClose} size="small" icon={<XMarkIcon />} />
          </Tooltip>
        </div>
      </div>
      <PerfectScrollbar
        onScrollY={handleScroll}
        options={{
          wheelPropagation: true,
        }}
      >
        <div className={`${mainClass}__content`}>
          {/* <Table data={table_data} loading={loading} /> */}
          <TableStack
            fullWidth
            data={logs}
            columns={columns}
            disabledSelect={true}
            rowClick={({ row }) => setDetailsModal(row)}
          />
        </div>
      </PerfectScrollbar>
      {!!details_modal && (
        <DetailsModal
          data={details_modal}
          onClose={() => setDetailsModal(null)}
        />
      )}
    </div>
  );
};

const LogsWindow = ({ onClose }) => (
  <LogsProvider>
    <LogsWindowContent onClose={onClose} />
  </LogsProvider>
);

export default LogsWindow;
