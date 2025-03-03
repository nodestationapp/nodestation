import "./styles.scss";

import cx from "classnames";

import { LockClosedIcon, LinkIcon } from "@heroicons/react/24/outline";

const mainClass = "table__text";

const Text = ({ tableSchema, locked, value, column }) => {
  const isRelation = !!tableSchema?.find((element) => element?.slug === column)
    ?.relation;

  // const onRelationClick = (e) => {
  //   e.stopPropagation();
  //   navigate("/tables/tbl_m7bzna16i6jkvzxn");
  // };

  return (
    <div
      className={cx(mainClass, {
        [`${mainClass}--is-relation`]: !!isRelation,
        [`${mainClass}--empty`]: !!!value,
      })}
    >
      {!!isRelation && !!value && (
        <div className={`${mainClass}__relation-icon`}>
          <LinkIcon />
        </div>
      )}
      <span>{value?.label || value || "-"}</span> {locked && <LockClosedIcon />}
    </div>
  );
};

export default Text;
