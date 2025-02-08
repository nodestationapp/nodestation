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
import Sort from "./components/Sort";
import Icon from "./components/Icon";
import Media from "./components/Media";
import Level from "./components/Level";
import Button from "components/Button";
import Boolean from "./components/Boolean";
import Toolbar from "./components/ToolBar";
import LogSource from "./components/LogSource";
import StatusChip from "components/StatusChip";
import BadgeName from "./components/BadgeName";
import IconButton from "components/IconButton";
import Checkbox from "components/form/Checkbox";
import LogMessage from "./components/LogMessage";
import UserProfile from "./components/UserProfile";
import EndpointCode from "./components/EndpointCode";
import EndpointName from "./components/EndpointName";
import NoItemsFound from "./components/NoItemsFound";
import TableSkeleton from "./components/TableSkeleton";
import IconButtonMenu from "components/IconButtonMenu";
import NewMessageName from "./components/NewMessageName";
import EmailSparklines from "./components/EmailSparklines";
import DragOrderSelect from "components/form/DragOrderSelect";

import api from "libs/api";

import { useOrganization } from "context/organization";
import { useTableWrapper } from "context/client/table-wrapper";

import {
  EyeIcon,
  PlusIcon,
  TrashIcon,
  EyeSlashIcon,
  Cog6ToothIcon,
  ListBulletIcon,
  LockClosedIcon,
  EllipsisHorizontalIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const mainClass = "table-stack";

const table_value_type = (item, cell, meta, tableSchema) => {
  const value = !!item?.sort
    ? cell?.row?.original
    : !!cell?.row?.original?.hasOwnProperty(item?.slug)
    ? cell?.getValue()
    : !!item?.type
    ? cell?.row?.original
    : null;

  switch (item?.type) {
    case "user_profile":
      return <UserProfile data={value} />;
    case "media":
      return <Media data={value} />;
    case "json":
      return <span>{JSON.stringify(value)}</span>;
    case "status":
      return (
        <StatusChip
          field={item?.slug}
          status={value}
          tableSchema={tableSchema}
        />
      );
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
    case "icon":
      return <Icon data={value} meta={item} />;
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
  sort,
  alert,
  setSort,
  filters,
  setFilters,
  rowClick,
  tableId,
  rowAction,
  tableSchema,
  disabledSelect,
  loading = false,
  fullWidth = false,
  toolbar: toolbarData,
}) => {
  const { preferences } = useOrganization();
  const table_preferences = preferences?.find(
    (item) => item?.table_id === tableId
  );

  const [isResizing, setIsResizing] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(
    table_preferences?.filtersToggle
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const { setTable, setSelectedRows: setSelectedRowsContext } =
    useTableWrapper();

  const [columnOrder, setColumnOrder] = useState(
    table_preferences?.order || null
  );
  const [columnVisibility, setColumnVisibility] = useState(
    table_preferences?.visibility || []
  );

  const formatted_columns = useMemo(
    () => [
      ...(!!!disabledSelect
        ? [
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
          ]
        : []),
      ...columns.map((item) => ({
        id: item?.slug,
        enableSorting: !!setSort,
        size: table_preferences?.content?.[item?.slug] || undefined,
        accessorFn: (row) => row?.[item?.slug],
        header: () => <span className="light">{item?.value}</span>,
        cell: (cell) => (
          <span className="light">
            {table_value_type(
              item,
              cell,
              meta?.[cell?.row?.index],
              tableSchema
            )}
          </span>
        ),
      })),
    ],
    // eslint-disable-next-line
    [loading]
  );

  const table = useReactTable({
    data: data || [],
    initialState: {
      columnPinning: {
        left: ["select"],
      },
    },
    state: {
      sorting: sort,
      columnOrder: columnOrder,
      rowSelection: selectedRows,
      columnVisibility: columnVisibility,
    },
    manualSorting: true,
    onSortingChange: setSort,
    enableRowSelection: true,
    columns: formatted_columns,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    enableColumnResizing: !!!fullWidth,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setSelectedRows,
  });

  const saveTransaction = async (values) => {
    await api.post("/preferences", {
      table_id: tableId,
      ...values,
    });
  };

  useEffect(() => {
    const handleMouseUp = (e) => {
      e.preventDefault();

      if (!!isResizing) {
        saveTransaction({ content: table.getState().columnSizing });
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
    if (!!sort?.length) {
      saveTransaction({ sort });
    }
    // eslint-disable-next-line
  }, [tableId, sort]);

  useEffect(() => {
    setTable(table);

    return () => {
      setTable(null);
    };
    // eslint-disable-next-line
  }, [table]);

  useEffect(() => {
    const selectedRows = table.getSelectedRowModel()?.rows;
    setSelectedRowsContext(selectedRows);
    // eslint-disable-next-line
  }, [selectedRows]);

  useEffect(() => {
    setTable(table);
    // eslint-disable-next-line
  }, [table]);

  const handleMouseDown = (e, header) => {
    e.stopPropagation();

    setIsResizing(true);
    header.getResizeHandler()(e);
  };

  const onVisibilityHanlder = (id) => {
    let temp = { ...columnVisibility };

    if (!!!temp?.hasOwnProperty(id)) {
      temp[id] = false;
    } else {
      temp[id] = !temp[id];
    }

    setColumnVisibility(temp);
    saveTransaction({ visibility: temp });
  };

  const onChangeColumnOrder = (value) => {
    setColumnOrder(value);
    saveTransaction({ order: value });
  };

  const isFilterValue = filters?.some((item) => !!item?.value);

  const toolbar = {
    menu: toolbarData?.menu,
    action: [
      ...(!!filters
        ? [
            <IconButton
              active={!!filtersExpanded}
              size="small"
              icon={<BoltIcon color={!!isFilterValue ? "#8A6FF1" : ""} />}
              onClick={() => {
                setFiltersExpanded((prev) => !prev);
                saveTransaction({ filtersToggle: !!filtersExpanded ? 0 : 1 });
              }}
            />,
          ]
        : []),

      ...(!!!toolbarData?.hideColumnOrder
        ? [
            <DragOrderSelect
              multi={true}
              value={
                !!columnOrder?.[0]
                  ? columnOrder
                  : columns?.map((item) => item?.slug)
              }
              CustomButton={({ active }) => (
                <IconButton
                  size="small"
                  active={active}
                  icon={<ListBulletIcon />}
                />
              )}
              itemAction={({ id }) => (
                <IconButton
                  size="small"
                  icon={
                    columnVisibility?.[id] === false ? (
                      <EyeSlashIcon />
                    ) : (
                      <EyeIcon />
                    )
                  }
                  onClick={() => onVisibilityHanlder(id)}
                />
              )}
              actionAlwaysVisible={true}
              options={columns?.map((item) => ({
                label: item?.value,
                value: item?.slug,
                disabled: columnVisibility?.[item?.slug] === false,
              }))}
              onChange={({ target }) => onChangeColumnOrder(target?.value)}
            />,
          ]
        : []),

      ...(!!toolbarData?.settingsButtonHandler
        ? [
            <IconButton
              size="small"
              icon={<Cog6ToothIcon />}
              href={toolbarData?.settingsButtonHandler}
            />,
          ]
        : []),
      ...(!!toolbarData?.deleteHandler
        ? [
            <IconButtonMenu
              icon={<EllipsisHorizontalIcon />}
              data={[
                {
                  type: "select",
                  label: "Delete",
                  icon: <TrashIcon />,
                  onClick: toolbarData?.deleteHandler,
                },
              ]}
            />,
          ]
        : []),
      ...(!!toolbarData?.newButtonHandler
        ? [
            <Button icon={<PlusIcon />} onClick={toolbarData?.newButtonHandler}>
              New
            </Button>,
          ]
        : []),
    ],
    selectAction: toolbarData?.selectAction || [],
  };

  return (
    <>
      <div
        className={cx(mainClass, {
          [`${mainClass}--full-width`]: !!fullWidth,
          [`${mainClass}--disabled-select`]: !!disabledSelect,
          [`${mainClass}--sortable`]: !!setSort,
        })}
      >
        <Toolbar
          data={toolbar}
          columns={columns}
          filters={filters}
          tableSchema={tableSchema}
          setFilters={setFilters}
          selectedRows={selectedRows}
          preferences={table_preferences}
          filtersExpanded={filtersExpanded}
          saveTransaction={saveTransaction}
        />
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
                      {headerGroup.headers.map((header, index) => (
                        <div
                          key={header.id}
                          className={`${mainClass}__header__col`}
                          style={{
                            width: header.getSize(),
                          }}
                        >
                          <div
                            className={`${mainClass}__header__col__wrapper`}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                            {index !== 0 && header?.column?.getCanSort() && (
                              <Sort id={header?.id} data={sort} />
                            )}
                          </div>
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
                    {alert}
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
                        <div className={`${mainClass}__body__row__action`}>
                          {!!rowAction
                            ? rowAction({
                                row: row?.original,
                                meta: meta?.[index],
                              })
                            : null}
                        </div>
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
