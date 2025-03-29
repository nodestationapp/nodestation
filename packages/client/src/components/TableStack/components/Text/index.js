import "./styles.scss";

import cx from "classnames";

import { LockClosedIcon, LinkIcon } from "@heroicons/react/24/outline";

const mainClass = "table__text";

const Text = ({ columns, locked, value, column }) => {
  const isRelation = columns?.find(
    (element) => element?.slug === column
  )?.relation;

  // const relation = tables?.find((element) => element?.id === isRelation);
  const relationValue = value?.label;

  // TODO: add relation click

  // const onRelationClick = (e) => {
  //   e.stopPropagation();
  //   navigate("/tables/{table}");
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
      <span>{relationValue || value || "-"}</span>{" "}
      {locked && <LockClosedIcon />}
    </div>
  );
};

export default Text;
