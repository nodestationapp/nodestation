import "./styles.scss";

import { Fragment } from "react";

import EntryIconName from "components/EntryIconName";
import MinimizeSkeleton from "./components/MinimizeSkeleton";

import { useEditor } from "context/client/editor";
import { useOrganization } from "context/organization";

const mainClass = "minimize-menu";

const MinimizeMenu = () => {
  const { loading } = useEditor();
  const { minimizeItems, removeMinimizeHandler } = useOrganization();

  if (!!loading) return <MinimizeSkeleton />;

  return (
    <div className={mainClass}>
      {minimizeItems?.map((item, index) => (
        <Fragment key={index}>
          <EntryIconName entry_id={item?.id} onRemove={removeMinimizeHandler} />
          <span className={`${mainClass}__item__separator`} />
        </Fragment>
      ))}
    </div>
  );
};

export default MinimizeMenu;
