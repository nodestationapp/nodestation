import "./styles.scss";

import { useEffect } from "react";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";

import Button from "components/Button";
import Tooltip from "components/Tooltip";
import KeyViewer from "components/KeyViewer";
import IconButton from "components/IconButton";

import { XMarkIcon } from "@heroicons/react/24/outline";

const mainClass = "modal";

const Modal = ({
  children,
  loading,
  onClose,
  onSubmit,
  variant,
  submit_label,
  submit_disabled,
  custom_actions,
  size,
  noPadding,
  action_cancel_hide,
  hide_action,
  submit_keys,
  withScroll,
  title,
}) => {
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

  useEffect(() => {
    document.addEventListener("keydown", onSubmitHandler);

    return () => {
      document.removeEventListener("keydown", onSubmitHandler);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={classnames(mainClass, {
        [`${mainClass}--no-submit`]: !!!onSubmit,
        [`${mainClass}--${size}`]: !!size,
        [`${mainClass}--no-padding`]: !!noPadding,
      })}
    >
      <div className={`${mainClass}__dialog`}>
        <div className={`${mainClass}__dialog__header`}>
          <span>{title}</span>
          <Tooltip text={<KeyViewer variant="dark" no_margin data={["Esc"]} />}>
            <IconButton icon={<XMarkIcon />} onClick={onClose} />
          </Tooltip>
        </div>
        <div className={`${mainClass}__dialog__wrapper`}>
          {!!withScroll ? (
            <PerfectScrollbar
              options={{
                wheelPropagation: true,
              }}
            >
              <div className={`${mainClass}__dialog__content`}>{children}</div>
            </PerfectScrollbar>
          ) : (
            <div className={`${mainClass}__dialog__content`}>{children}</div>
          )}

          {!!!hide_action && (
            <div className={`${mainClass}__dialog__actions`}>
              {!!!action_cancel_hide && (
                <Button onClick={onClose} variant="transparent-gray">
                  Cancel
                </Button>
              )}
              {!!custom_actions ? (
                <div className={`${mainClass}__dialog__actions__custom`}>
                  {custom_actions}
                </div>
              ) : (
                !!onSubmit && (
                  <Button
                    disabled={submit_disabled}
                    variant={variant}
                    onClick={onSubmit}
                    loading={loading}
                  >
                    {submit_label}
                    {submit_keys && <KeyViewer data={submit_keys} />}
                  </Button>
                )
              )}
            </div>
          )}
        </div>
      </div>
      <div className={`${mainClass}__backdrop`}></div>
    </div>
  );
};

export default Modal;
