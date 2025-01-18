import "./styles.scss";
import "react-perfect-scrollbar/dist/css/styles.css";

import moment from "moment";
import cx from "classnames";
import { useLocation, useNavigate } from "react-router-dom";

import Avatar from "components/layouts/DashboardLayout/components/Sidebar/components/Avatar";

import { useEditor } from "context/client/editor";

const mainClass = "history-list";

const HistoryList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { editor_history, query_history_entry } = useEditor();

  const onUpdateEntry = (id) => {
    navigate(`${location.pathname}?entry_id=${id}`);
  };

  return (
    <div className={mainClass}>
      {editor_history?.map((item, index) => (
        <button
          key={index}
          onClick={() => onUpdateEntry(item?.id)}
          className={cx(`${mainClass}__item`, {
            [`${mainClass}__item--active`]: !!!query_history_entry
              ? index === 0
              : parseInt(query_history_entry) === item?.id,
          })}
        >
          <span>Version {editor_history?.length - index}</span>
          <Avatar
            photo={item?.uid?.photo?.url}
            user={`${item?.uid?.first_name} ${item?.uid?.last_name}`}
            bottom={`Updated ${moment(item?.created_at)?.fromNow()}`}
            read_only
          />
        </button>
      ))}
    </div>
  );
};

export default HistoryList;
