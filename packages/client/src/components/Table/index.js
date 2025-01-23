import "./styles.scss";

import classnames from "classnames";
import { Link } from "react-router-dom";
import { Fragment, useState } from "react";

import Date from "./components/Date";
import Media from "./components/Media";
import Level from "./components/Level";
import Button from "components/Button";
import Toolbar from "./components/ToolBar";
import Boolean from "./components/Boolean";
import LogSource from "./components/LogSource";
import StatusChip from "components/StatusChip";
import BadgeName from "./components/BadgeName";
import Checkbox from "components/form/Checkbox";
import LogMessage from "./components/LogMessage";
import UserProfile from "./components/UserProfile";
import EndpointCode from "./components/EndpointCode";
import EndpointName from "./components/EndpointName";
import TableSkeleton from "./components/TableSkeleton";
import NewMessageName from "./components/NewMessageName";
import EmailSparklines from "./components/EmailSparklines";
import NoItemsFound from "components/List/components/NoItemsFound";

import {
  AdjustmentsHorizontalIcon,
  ArrowDownIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";

const mainClass = "table";

const Table = ({
  data,
  loading,
  sort,
  setSort,
  hide_header,
  checkChange,
  action,
  filters,
  toolbar,
}) => {
  const [checked, setChecked] = useState([]);

  const current_sort = sort?.split(":");

  if (data?.items?.length === 0) return <NoItemsFound />;

  const checkedAll = () => {
    let temp_checked = [...checked];
    let entries = data?.items;

    const is_checked_all = entries?.length === temp_checked?.length;

    if (!!is_checked_all) {
      temp_checked = [];
    } else {
      temp_checked = entries?.map((item) => item?.id);
    }

    setChecked([...temp_checked]);
    if (!!checkChange) {
      checkChange([...temp_checked]);
    }
  };

  const checkedEntry = (id) => {
    let temp_checked = [...checked];

    const index = temp_checked?.findIndex((item) => item === id);
    if (index === -1) {
      temp_checked.push(id);
    } else {
      temp_checked?.splice(index, 1);
    }

    setChecked([...temp_checked]);
    if (!!checkChange) {
      checkChange([...temp_checked]);
    }
  };

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

  const sortHandler = (key) => {
    let method;
    let new_key = key;

    if (current_sort?.[1] === "asc") {
      method = "desc";
    } else {
      method = "asc";
    }

    setSort(`${new_key}:${method}`);
  };

  return (
    <div className={mainClass}>
      <div className={`${mainClass}__content`}>
        {!!filters && (
          <div className={`${mainClass}__content__toolbar`}>
            {!!checked?.length ? (
              <Toolbar data={toolbar} count={checked?.length} />
            ) : (
              <>
                <Button
                  icon={<AdjustmentsHorizontalIcon />}
                  variant="transparent-gray"
                >
                  Filters
                </Button>
                {action}
              </>
            )}
          </div>
        )}
        <div className={`${mainClass}__content__wrapper`}>
          {!!!hide_header && (
            <div
              className={classnames(
                `${mainClass}__row`,
                `${mainClass}__row--header`
              )}
            >
              {!!checkChange && (
                <div
                  className={classnames(
                    `${mainClass}__col`,
                    `${mainClass}__col--select`
                  )}
                >
                  <Checkbox
                    onChange={checkedAll}
                    onClick={(e) => e.stopPropagation()}
                    checked={checked?.length === data?.items?.length}
                  />
                </div>
              )}
              {data?.keys?.map(
                ({ key, sort_key: table_sort_key, value }, index) => {
                  const sort_key = table_sort_key || key;

                  return (
                    <div
                      key={index}
                      onClick={
                        value && !!setSort ? () => sortHandler(sort_key) : null
                      }
                      className={classnames(
                        `${mainClass}__col`,
                        `${mainClass}__col--${key}`,
                        {
                          [`${mainClass}__col--${current_sort?.[1]}`]:
                            sort_key === current_sort?.[0],
                        }
                      )}
                    >
                      <span>{value}</span>
                      {!!value &&
                        !!setSort &&
                        (sort_key === current_sort?.[0] ? (
                          <ArrowDownIcon
                            className={`${mainClass}__col__arrow`}
                            color="#F0F1F3"
                          />
                        ) : (
                          <ArrowsUpDownIcon color="#647082" />
                        ))}
                    </div>
                  );
                }
              )}
            </div>
          )}
          {!!loading ? (
            <TableSkeleton />
          ) : (
            <>
              {data?.items?.map(
                (
                  {
                    id,
                    onclick,
                    data,
                    disabled,
                    actions,
                    href,
                    preventClick,
                    animationHighlight,
                  },
                  index
                ) => {
                  const Component = !!href ? Link : "div";

                  return (
                    <Component
                      key={index}
                      onClick={onclick}
                      to={href}
                      className={classnames(`${mainClass}__row`, {
                        [`${mainClass}__row--selected`]:
                          !!checked?.includes(id),
                        [`${mainClass}__row--disabled`]: !!disabled,
                        [`${mainClass}__row--prevent-hover`]: !!preventClick,
                        [`${mainClass}__row--animation-highlight`]:
                          !!animationHighlight,
                      })}
                    >
                      {!!checkChange && (
                        <div
                          className={classnames(
                            `${mainClass}__col`,
                            `${mainClass}__col--select`
                          )}
                        >
                          <Checkbox
                            checked={checked?.includes(id)}
                            onChange={() => checkedEntry(id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      )}
                      {data?.map(({ key, value, type, align }, index) => (
                        <Fragment key={index}>
                          <div
                            className={classnames(
                              `${mainClass}__col`,
                              `${mainClass}__col--${key}`,
                              {
                                [`${mainClass}__col--${align}`]: !!align,
                              }
                            )}
                          >
                            {table_value_type(type, value)}
                          </div>
                        </Fragment>
                      ))}
                      {!!actions && (
                        <div className={`${mainClass}__row__actions`}>
                          {actions}
                        </div>
                      )}
                    </Component>
                  );
                }
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
