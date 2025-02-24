import "./styles.scss";

import cx from "classnames";

import { LockClosedIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const mainClass = "table__text";

const Text = ({ tableSchema, locked, value, column }) => {
  const navigate = useNavigate();
  const isRelation = !!tableSchema?.find((element) => element?.slug === column)
    ?.reference;

  const onRelationClick = (e) => {
    e.stopPropagation();
    navigate("/tables/tbl_m7bzna16i6jkvzxn");
  };

  return (
    <div
      onClick={onRelationClick}
      className={cx(mainClass, {
        [`${mainClass}--is-relation`]: !!isRelation,
      })}
    >
      {!!tableSchema?.find((element) => element?.slug === column)
        ?.reference && (
        <div className={`${mainClass}__relation-icon`}>
          <LinkIcon />
        </div>
      )}
      <span>{value || "-"}</span> {locked && <LockClosedIcon />}
    </div>
  );
};

export default Text;
