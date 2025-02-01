import "./styles.scss";
import "react-perfect-scrollbar/dist/css/styles.css";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import cx from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import React, { useEffect, useMemo, useState } from "react";

import Date from "./components/Date";
import Media from "./components/Media";
import Level from "./components/Level";
import Boolean from "./components/Boolean";
import LogSource from "./components/LogSource";
import StatusChip from "components/StatusChip";
import BadgeName from "./components/BadgeName";
import Checkbox from "components/form/Checkbox";
import LogMessage from "./components/LogMessage";
import UserProfile from "./components/UserProfile";
import EndpointCode from "./components/EndpointCode";
import EndpointName from "./components/EndpointName";
import NoItemsFound from "./components/NoItemsFound";
import TableSkeleton from "./components/TableSkeleton";
import NewMessageName from "./components/NewMessageName";
import EmailSparklines from "./components/EmailSparklines";

import api from "libs/api";

import { useOrganization } from "context/organization";
import { useTableWrapper } from "context/client/table-wrapper";
import { LockClosedIcon } from "@heroicons/react/24/outline";

const mainClass = "table-stack";

const table_value_type = (item, cell, meta) => {
  const value = !!cell?.row?.original?.hasOwnProperty(item?.slug)
    ? cell?.getValue()
    : cell?.row?.original;

  switch (item?.type) {
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
      return (
        <p className={`${mainClass}__regular`}>
          {value || "-"} {!!meta?.locked && <LockClosedIcon />}
        </p>
      );
  }
};

const TableStack = ({
  data,
  meta,
  columns,
  rowClick,
  tableName,
  loading = false,
  fullWidth = false,
}) => {
  const { preferences } = useOrganization();
  const [isResizing, setIsResizing] = useState(false);
  const [tempSelectedRows, setTempSelectedRows] = useState(false);
  const { setTable, setSelectedRows } = useTableWrapper();

  const table_preferences = preferences?.find(
    (item) => item?.type === `tables_${tableName}`
  );

  const formatted_columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            disabled={!!meta?.some((item) => item?.locked)}
            onClick={(e) => e.stopPropagation()}
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            disabled={!!meta?.[row?.index]?.locked}
            checked={row.getIsSelected()}
            onClick={(e) => e.stopPropagation()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      ...columns.map((item) => ({
        id: item?.slug,
        size: table_preferences?.content?.[item?.slug] || undefined,
        accessorFn: (row) => row?.[item?.slug],
        header: () => <span className="light">{item?.value}</span>,
        cell: (cell) => (
          <span className="light">
            {table_value_type(item, cell, meta?.[cell?.row?.index])}
          </span>
        ),
      })),
    ],
    // eslint-disable-next-line
    [loading]
  );

  const table = useReactTable({
    data: data || [],
    state: {
      rowSelection: tempSelectedRows,
    },
    enableRowSelection: true,
    enableColumnResizing: !!!fullWidth,
    columns: formatted_columns,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setTempSelectedRows,
  });

  const saveTransaction = async () => {
    await api.post("/preferences", {
      type: `tables_${tableName}`,
      content: table.getState().columnSizing,
    });
  };

  useEffect(() => {
    const handleMouseUp = () => {
      if (!!isResizing) {
        saveTransaction();
        setIsResizing(false);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line
  }, [isResizing]);

  useEffect(() => {
    setTable(table);
    // eslint-disable-next-line
  }, [table]);

  useEffect(() => {
    setSelectedRows(table?.getSelectedRowModel()?.rows);
    // eslint-disable-next-line
  }, [tempSelectedRows]);

  const handleMouseDown = (e, header) => {
    setIsResizing(true);
    header.getResizeHandler()(e);
  };

  return (
    <>
      <div
        className={cx(mainClass, {
          [`${mainClass}--full-width`]: !!fullWidth,
        })}
      >
        {!!loading ? (
          <TableSkeleton />
        ) : (
          <div className={`${mainClass}__scroll__wrapper`}>
            <PerfectScrollbar
              options={{
                suppressScrollY: true,
                wheelPropagation: true,
              }}
            >
              <div
                {...{
                  className: `${mainClass}__wrapper`,
                }}
              >
                <div className={`${mainClass}__header`}>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <div
                      key={headerGroup.id}
                      className={`${mainClass}__header__row`}
                    >
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
                              onMouseDown: (e) => handleMouseDown(e, header),
                              onTouchStart: (e) => handleMouseDown(e, header),
                              className: `${`${mainClass}__header__col__resizer`} ${
                                table.options.columnResizeDirection
                              } ${
                                header.column.getIsResizing()
                                  ? "isResizing"
                                  : ""
                              }`,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                {data?.length === 0 ? (
                  <NoItemsFound />
                ) : (
                  <div className={`${mainClass}__body`}>
                    {table.getRowModel().rows.map((row, index) => (
                      <div
                        key={row.id}
                        className={cx(`${mainClass}__body__row`, {
                          [`${mainClass}__body__row--disabled`]:
                            !!meta?.[index]?.disabled,
                        })}
                        onClick={() =>
                          rowClick({ row: row.original, meta: meta?.[index] })
                        }
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </PerfectScrollbar>
          </div>
        )}
      </div>
    </>
  );
};

export default TableStack;
