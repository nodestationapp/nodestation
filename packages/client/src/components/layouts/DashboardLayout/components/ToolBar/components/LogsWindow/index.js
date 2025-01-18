import "./styles.scss";
import "react-perfect-scrollbar/dist/css/styles.css";

import moment from "moment";
import cx from "classnames";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

import Table from "components/Table";
import Tooltip from "components/Tooltip";
import KeyViewer from "components/KeyViewer";
import IconButton from "components/IconButton";
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
  const { logs, fetchNextPage, loading } = useLogs();
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

  const fields = [
    {
      key: "level",
    },
    {
      key: "log_source",
      value: "Source",
    },
    {
      key: "log_created_at",
      value: "Date",
    },
    {
      key: "details",
      value: "Message",
    },
  ];

  const table_data = {
    keys: [...fields],
    items: logs?.map((item) => {
      return {
        animationHighlight: !!!item?.is_read,
        preventClick: item?.source?.type === "emails",
        onclick: () => setDetailsModal(item),
        data: [
          ...(item?.source?.type === "endpoint"
            ? [
                {
                  key: "level",
                  type: "endpoint_code",
                  value: item?.res?.status,
                },
              ]
            : [
                {
                  key: "level",
                  type: "level",
                  value: item?.level,
                },
              ]),

          {
            key: "log_source",
            type: "log_source",
            value: item,
          },
          {
            key: "log_created_at",
            value: moment(item?.created_at)?.format("YYYY-MM-DD HH:mm:ss A"),
          },
          {
            key: "details",
            type: "log_message",
            value: item,
          },
        ],
      };
    }),
  };

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
          <Table data={table_data} loading={loading} />
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
