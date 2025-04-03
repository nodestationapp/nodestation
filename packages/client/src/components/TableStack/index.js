import "./styles.scss";
import "react-perfect-scrollbar/dist/css/styles.css";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import cx from "classnames";
import ReactJsonView from "@microlink/react-json-view";
import PerfectScrollbar from "react-perfect-scrollbar";
import React, { useEffect, useMemo, useState } from "react";

import Text from "./components/Text";
import Date from "./components/Date";
import Sort from "./components/Sort";
import Icon from "./components/Icon";
import Media from "./components/Media";
import Level from "./components/Level";
import Button from "components/Button";
import Boolean from "./components/Boolean";
import MimeType from "components/MimeType";
import Toolbar from "./components/ToolBar";
import MediaName from "./components/MediaName";
import MediaSize from "./components/MediaSize";
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

import { useTableWrapper } from "context/client/table-wrapper";

import {
  EyeIcon,
  PlusIcon,
  BoltIcon,
  TrashIcon,
  EyeSlashIcon,
  Cog6ToothIcon,
  ListBulletIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

const mainClass = "table-stack";

const table_value_type = (item, cell, meta, columns) => {
  const value = cell?.row?.original?.hasOwnProperty(item?.slug)
    ? cell?.row?.original?.[item?.slug]
    : cell?.row?.original;

  switch (item?.type) {
    case "user":
    case "user_profile":
      return <UserProfile data={value} />;
    case "media":
      return <Media data={value} />;
    case "json":
      return (
        <ReactJsonView
          name={null}
          theme="ocean"
          collapsed={true}
          enableClipboard={false}
          displayDataTypes={false}
          src={value || {}}
        />
      );
    case "select":
      return <StatusChip field={item?.slug} status={value} columns={columns} />;
    case "mime_type":
      return <MimeType data={value} />;
    case "email_sparklines":
      return <EmailSparklines data={value} />;
    case "badge_name":
      return <BadgeName data={value} />;
    case "media_name":
      return <MediaName data={value} />;
    case "endpoint_name":
      return <EndpointName data={value} />;
    case "new_message_name":
      return <NewMessageName data={value} />;
    case "date":
      return <Date data={value} />;
    case "level":
      return <Level data={value} meta={cell?.row?.original} />;
    case "method":
      return <LogSource data={value} />;
    case "endpoint_code":
      return <EndpointCode data={value} />;
    case "log_message":
      return (
        <LogMessage data={cell?.row?.original} meta={cell?.row?.original} />
      );
    case "boolean":
      return <Boolean data={value} />;
    case "icon":
      return <Icon data={value} meta={item} />;
    case "media_size":
      return <MediaSize data={value} />;
    default:
      return (
        <Text
          columns={columns}
          locked={meta?.locked}
          value={value}
          column={item?.slug}
        />
      );
  }
};

const TableStack = ({
  data,
  meta,
  columns,
  alert,
  view,
  rowSize,
  filtering,
  preferences,
  hideHeader,
  rowClick,
  tableId,
  rowAction,
  disabledSelect,
  loading = false,
  saveTransaction,
  fullWidth = false,
  toolbar: toolbarData,
  alwaysFiltersExpanded,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const { setTable, selectedRows, setSelectedRows } = useTableWrapper();

  const [sort, setSort] = useState(null);
  const [columnOrder, setColumnOrder] = useState(null);
  const [columnVisibility, setColumnVisibility] = useState([]);
  const [columnSizes, setColumnSizes] = useState({});
  const [filters, setFilters] = useState([{ field: null, value: null }]);

  useEffect(() => {
    setFiltersExpanded(preferences?.filtersToggle);
    setColumnVisibility(preferences?.visibility);
    setColumnOrder(preferences?.order);
    setSort(preferences?.sort || null);
    setFilters(preferences?.filters || [{ field: null, value: null }]);
    setColumnSizes(preferences?.content);
    setSelectedRows([]);
    // eslint-disable-next-line
  }, [tableId, loading, view]);

  const formatted_columns = useMemo(
    () => [
      ...(!!!disabledSelect
        ? [
            {
              id: "select",
              size: 40,
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
        size: columnSizes?.[item?.slug] || item?.width,
        accessorFn: (row) => row?.[item?.slug],
        header: () => <span className="light">{item?.name}</span>,
        cell: (cell) =>
          table_value_type(item, cell, meta?.[cell?.row?.index], columns),
      })),
    ],
    // eslint-disable-next-line
    [columns, columnSizes]
  );

  const columnWidths = useMemo(() => {
    return formatted_columns.reduce((acc, item) => {
      acc[item.id] = item.size || 100;
      return acc;
    }, {});
    // eslint-disable-next-line
  }, [formatted_columns, columnSizes]);

  const table = useReactTable({
    data: data,
    initialState: {
      columnPinning: {
        left: ["select", "level"],
      },
    },
    state: {
      sorting: sort,
      columnSizing: columnWidths,
      columnOrder: columnOrder?.map((item) => item),
      rowSelection: selectedRows,
      columnVisibility: columnVisibility,
    },
    manualFiltering: true,
    manualSorting: true,
    onSortingChange: setSort,
    enableRowSelection: true,
    columns: formatted_columns,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    enableColumnResizing: !!!fullWidth,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setSelectedRows,
    onColumnSizingChange: (sizes) => {
      const size = sizes();
      setColumnSizes((prev) => ({ ...prev, ...size }));
    },
  });

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
    if (sort !== null) {
      saveTransaction({ sort });
    }
    // eslint-disable-next-line
  }, [sort]);

  useEffect(() => {
    setTable(table);

    return () => {
      setTable(null);
    };
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
    customizableView: toolbarData?.customizableView,
    action: [
      ...(!!filtering
        ? [
            <IconButton
              key={1}
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
              key={2}
              multi={true}
              value={
                !!columnOrder?.[0]
                  ? columnOrder?.map((item) => item)
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
                value: item?.slug,
                label: item?.name,
                disabled: columnVisibility?.[item?.slug] === false,
              }))}
              onChange={(value) => onChangeColumnOrder(value)}
            />,
          ]
        : []),

      ...(!!toolbarData?.settingsButtonHandler
        ? [
            <IconButton
              key={3}
              size="small"
              icon={<Cog6ToothIcon />}
              href={toolbarData?.settingsButtonHandler}
            />,
          ]
        : []),

      ...(!!toolbarData?.deleteHandler
        ? [
            <IconButtonMenu
              key={4}
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
            <Button
              key={5}
              icon={<PlusIcon />}
              onClick={toolbarData?.newButtonHandler}
            >
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
          [`${mainClass}--${rowSize}`]: !!rowSize,
        })}
      >
        <Toolbar
          view={view}
          tableId={tableId}
          filters={filters}
          setFilters={setFilters}
          columns={columns}
          selectedRows={selectedRows}
          saveTransaction={saveTransaction}
          data={!!toolbarData ? toolbar : null}
          filtersExpanded={alwaysFiltersExpanded || filtersExpanded}
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
                {alert}
                {!!!hideHeader && (
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
                              width: columnWidths?.[header.id],
                              flex: !!formatted_columns?.[index]?.size
                                ? "unset"
                                : !!fullWidth
                                  ? 1
                                  : "unset",
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
                )}
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
                        {row.getVisibleCells().map((cell, index) => (
                          <div
                            key={cell.id}
                            className={`${mainClass}__body__col`}
                            style={{
                              width: columnWidths?.[cell.column.id],
                              flex: !!formatted_columns?.[index]?.size
                                ? "unset"
                                : !!fullWidth
                                  ? 1
                                  : "unset",
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
