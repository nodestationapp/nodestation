import "./styles.scss";

import { Fragment } from "react";
import classnames from "classnames";

const mainClass = "key-viewer";

const KeyViewer = ({ data, variant, no_margin }) => {
  return (
    <div
      className={classnames(mainClass, {
        [`${mainClass}--${variant}`]: !!variant,
        [`${mainClass}--no-margin`]: !!no_margin,
      })}
    >
      {data?.map((item, index) => (
        <Fragment key={index}>
          <div className={`${mainClass}__item`}>{item}</div>
          {data?.length - 1 !== index && <span>+</span>}
        </Fragment>
      ))}
    </div>
  );
};

export default KeyViewer;
