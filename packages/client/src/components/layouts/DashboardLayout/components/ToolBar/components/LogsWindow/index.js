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
  const { logs, fetchNextPage, filters, setFilters } = useLogs();
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
      key: "method",
      slug: "method",
      type: "method",
      width: 65,
    },
    {
      key: "status",
      slug: "status",
      width: 50,
    },
    {
      key: "created_at",
      slug: "created_at",
      type: "date",
      width: 200,
    },
    {
      key: "url",
      slug: "url",
    },
  ];

  const handleScroll = ({ scrollTop, scrollHeight, clientHeight }) => {
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      fetchNextPage();
    }
  };

  const tableSchema = [
    {
      name: "Level",
      slug: "level",
      type: "select",
      options: [
        {
          label: "Success",
          value: "success",
          color: "#009E77",
        },
        {
          label: "Error",
          value: "error",
          color: "#ED342D",
        },
      ],
    },
    {
      name: "Method",
      slug: "method",
      type: "select",
      options: [
        {
          label: "POST",
          value: "POST",
          color: "#009E77",
        },
        {
          label: "GET",
          value: "GET",
          color: "#1191FF",
        },
        {
          label: "PUT",
          value: "PUT",
          color: "#E97500",
        },
        {
          label: "DELETE",
          value: "DELETE",
          color: "#F93F3E",
        },
      ],
    },
    {
      name: "Status",
      slug: "status",
      type: "text",
    },
    {
      name: "Url",
      slug: "url",
      type: "text",
    },
    {
      name: "Created at",
      slug: "created_at",
      type: "date",
    },
  ];

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
          <IconButton onClick={onClose} size="small" icon={<XMarkIcon />} />
        </div>
      </div>
      <PerfectScrollbar
        onScrollY={handleScroll}
        options={{
          wheelPropagation: true,
        }}
      >
        <div className={`${mainClass}__content`}>
          <TableStack
            fullWidth
            hideHeader
            data={logs}
            filters={filters}
            tableId="logs"
            tableSchema={tableSchema}
            setFilters={setFilters}
            columns={columns}
            disabledSelect={true}
            alwaysFiltersExpanded
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
