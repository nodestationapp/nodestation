import "./styles.scss";
import "react-perfect-scrollbar/dist/css/styles.css";

import { useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

import Loader from "components/Loader";
import HistoryList from "./components/HistoryList";
import EntryIconName from "components/EntryIconName";
import HistoryViewer from "./components/HistoryViewer";
import EditorContentLayout from "components/layouts/EditorContentLayout";
import MinimizeSkeleton from "components/layouts/EditorContentLayout/components/MinimizeMenu/components/MinimizeSkeleton";

import { useEditor } from "context/client/editor";
import { useOrganization } from "context/organization";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const mainClass = "history-content";

const ContentHistory = ({ data }) => {
  const {
    current_entry,
    editor_history_loading,
    history_id,
    loading,
    editor_history_entry_loading,
  } = useEditor();
  const { setMinimizeHandler } = useOrganization();

  useEffect(() => {
    if (!!!data) return;
    setMinimizeHandler(data?.id);
    // eslint-disable-next-line
  }, [data]);

  const header_submenu = [
    {
      label: !!loading ? (
        <MinimizeSkeleton />
      ) : (
        <>
          <ChevronLeftIcon />
          <EntryIconName entry_id={history_id} />
        </>
      ),
      href: `/editor/${current_entry?.slice(0, -1)?.join("/")}`,
    },
  ];

  return (
    <EditorContentLayout
      loading={editor_history_loading}
      header_submenu={header_submenu}
    >
      <div className={mainClass}>
        <div className={`${mainClass}__left`}>
          {!!editor_history_entry_loading ? (
            <div className={`${mainClass}__left__loading`}>
              <Loader center />
            </div>
          ) : (
            <HistoryViewer />
          )}
        </div>
        <PerfectScrollbar>
          <div className={`${mainClass}__right`}>
            <HistoryList />
          </div>
        </PerfectScrollbar>
      </div>
    </EditorContentLayout>
  );
};

export default ContentHistory;
