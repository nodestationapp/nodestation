import "./styles.scss";

import cx from "classnames";

import { LockClosedIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useOrganization } from "context/organization";

const mainClass = "table__text";

const Text = ({ tableSchema, locked, value, column }) => {
  const { tables = [] } = useOrganization();

  const isRelation = tableSchema?.find(
    (element) => element?.slug === column
  )?.relation;

  const relation = tables?.find((element) => element?.id === isRelation);
  const relationValue = value?.[relation?.display_name];

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
