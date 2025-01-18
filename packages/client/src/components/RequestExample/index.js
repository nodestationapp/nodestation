import "./styles.scss";

import { useState } from "react";

import Tooltip from "components/Tooltip";
import MethodSelect from "components/MethodSelect";

import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

const mainClass = "request-example";

const RequestExample = ({ body, url, method }) => {
  const formatted_body = body?.map(
    (item) =>
      `<span class=${mainClass}__content__key>${item?.slug}</span>: <span class=${mainClass}__content__value>"${item?.type}"</span>`
  );

  const [copied, setCopied] = useState(false);

  const onCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={`${mainClass}`}>
      <Tooltip text={!!copied ? "Copied" : "Copy endpoint"}>
        <div className={`${mainClass}__header`} onClick={() => onCopy(url)}>
          <div className={`${mainClass}__header__url`}>
            <MethodSelect method={method} read_only />
            <span>{url}</span>
          </div>
          <div className={`${mainClass}__header__icon`}>
            <ClipboardDocumentListIcon />
          </div>
        </div>
      </Tooltip>
      <div className={`${mainClass}__content`}>
        {!!body && (
          <p
            dangerouslySetInnerHTML={{
              __html: `<span class=${mainClass}__content__body>body</span> {\n  ${formatted_body?.join(
                ",\n  "
              )}\n}`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RequestExample;
