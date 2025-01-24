import "./styles.scss";
import "react-perfect-scrollbar/dist/css/styles.css";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import PerfectScrollbar from "react-perfect-scrollbar";

import Date from "./components/Date";
import Media from "./components/Media";
import Level from "./components/Level";
// import Button from "components/Button";
// import Toolbar from "./components/ToolBar";
import Boolean from "./components/Boolean";
import LogSource from "./components/LogSource";
import StatusChip from "components/StatusChip";
import BadgeName from "./components/BadgeName";
// import Checkbox from "components/form/Checkbox";
import LogMessage from "./components/LogMessage";
import UserProfile from "./components/UserProfile";
import EndpointCode from "./components/EndpointCode";
import EndpointName from "./components/EndpointName";
// import TableSkeleton from "./components/TableSkeleton";
import NewMessageName from "./components/NewMessageName";
import EmailSparklines from "./components/EmailSparklines";
// import NoItemsFound from "components/List/components/NoItemsFound";

const mainClass = "table-stack";

const table_value_type = (type, value) => {
  switch (type) {
    case "user_profile":
      return <UserProfile data={value} />;
    case "media":
      return <Media data={value} />;
    case "json":
      return <span>{JSON.stringify(value)}</span>;
    case "status":
      return <StatusChip status={value} />;
    case "email_sparklines":
      return <EmailSparklines data={value} />;
    case "badge_name":
      return <BadgeName data={value} />;
    case "endpoint_name":
      return <EndpointName data={value} />;
    case "new_message_name":
      return <NewMessageName data={value} />;
    case "date":
      return <Date data={value} />;
    case "level":
      return <Level data={value} />;
    case "log_source":
      return <LogSource data={value} />;
    case "endpoint_code":
      return <EndpointCode data={value} />;
    case "log_message":
      return <LogMessage data={value} />;
    case "boolean":
      return <Boolean data={value} />;
    default:
      return <p className="table__regular">{value || "-"}</p>;
  }
};

const TableStack = ({ columns, data, rowClick, rowAction }) => {
  const formatted_columns = columns?.map((item) => ({
    accessorFn: (row) => row?.[item?.slug],
    id: item?.slug,
    header: () => <span className="light">{item?.value}</span>,
    cell: (cell) => (
      <span className="light">
        {table_value_type(item?.type, cell?.getValue())}
      </span>
    ),
  }));

  const table = useReactTable({
    data,
    columns: formatted_columns,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={mainClass}>
      <PerfectScrollbar
        options={{
          wheelPropagation: true,
        }}
      >
        <div
          {...{
            className: `${mainClass}__wrapper`,
            style: {
              width: table.getTotalSize(),
              minWidth: "100%",
            },
          }}
        >
          <div className={`${mainClass}__header`}>
            {table.getHeaderGroups().map((headerGroup) => (
              <div key={headerGroup.id} className={`${mainClass}__header__row`}>
                {headerGroup.headers.map((header) => (
                  <div
                    key={header.id}
                    className={`${mainClass}__header__col`}
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    <div
                      {...{
                        onDoubleClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `${`${mainClass}__header__col__resizer`} ${
                          table.options.columnResizeDirection
                        } ${header.column.getIsResizing() ? "isResizing" : ""}`,
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className={`${mainClass}__body`}>
            {table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className={`${mainClass}__body__row`}
                onClick={() => rowClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <div
                    key={cell.id}
                    className={`${mainClass}__body__col`}
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    <span>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </span>
                  </div>
                ))}
                {!!rowAction && (
                  <div className={`${mainClass}__body__row__actions`}>
                    {rowAction(row.original)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default TableStack;
