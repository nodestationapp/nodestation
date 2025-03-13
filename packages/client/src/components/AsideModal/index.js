import "./styles.scss";

import classnames from "classnames";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

import Button from "components/Button";
import Tooltip from "components/Tooltip";
import KeyViewer from "components/KeyViewer";
import IconButton from "components/IconButton";

import { XMarkIcon } from "@heroicons/react/24/outline";

const mainClass = "aside-modal";

const AsideModal = ({
  children,
  loading,
  onClose,
  onSubmit,
  variant,
  submit_label,
  custom_actions,
  reject_label = "Cancel",
  header,
  size,
  noPadding,
  action_cancel_hide,
  hide_action,
  submit_keys,
}) => {
  const [is_open, setIsOpen] = useState(false);

  const onSubmitHandler = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        onSubmit();
      }
    }
  };

  const onCloseHandler = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    setIsOpen(true);
    document.addEventListener("keydown", onSubmitHandler);

    return () => {
      document.removeEventListener("keydown", onSubmitHandler);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={classnames(mainClass, {
        [`${mainClass}--${size}`]: !!size,
        [`${mainClass}--active`]: !!is_open,
        [`${mainClass}--no-submit`]: !!!onSubmit,
        [`${mainClass}--no-padding`]: !!noPadding,
      })}
    >
      <div className={`${mainClass}__dialog`}>
        {header && (
          <div className={`${mainClass}__dialog__header`}>
            <span>{header}</span>
            <Tooltip
              text={<KeyViewer variant="dark" no_margin data={["Esc"]} />}
            >
              <IconButton icon={<XMarkIcon />} onClick={onCloseHandler} />
            </Tooltip>
          </div>
        )}
        <PerfectScrollbar
          options={{
            wheelPropagation: true,
          }}
        >
          <div className={`${mainClass}__dialog__content`}>{children}</div>
        </PerfectScrollbar>

        {!!!hide_action && (
          <div className={`${mainClass}__dialog__actions`}>
            {!!!action_cancel_hide && (
              <Button onClick={onCloseHandler} variant="transparent-gray">
                {reject_label}
              </Button>
            )}
            {!!custom_actions ? (
              <div className={`${mainClass}__dialog__actions__custom`}>
                {custom_actions}
              </div>
            ) : (
              !!onSubmit && (
                <Button variant={variant} onClick={onSubmit} loading={loading}>
                  {submit_label}
                  {submit_keys && <KeyViewer data={submit_keys} />}
                </Button>
              )
            )}
          </div>
        )}
      </div>
      <div onClick={onCloseHandler} className={`${mainClass}__backdrop`}></div>
    </div>
  );
};

export default AsideModal;
