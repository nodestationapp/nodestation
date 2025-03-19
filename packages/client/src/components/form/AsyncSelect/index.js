import "./styles.scss";
import "react-perfect-scrollbar/dist/css/styles.css";

import classnames from "classnames";
import { useState, useRef, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

import useOnScreen from "libs/helpers/useOnScreen";
import useClickOutside from "libs/helpers/useClickOutside";

import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ReactComponent as ProfilePlaceholder } from "assets/icons/profile-placeholder.svg";
import IconButton from "components/IconButton";

const mainClass = "async-select";

let timer;

const AsyncSelect = ({
  label,
  options = [],
  required,
  selected,
  onChange,
  disabled,
  value,
  touched,
  error,
  hideError,
  id,
  variant,
  noArrow,
  getData,
  size,
  placeholder,
}) => {
  const is_error = !!!hideError && touched && !!error;
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [select_open, setSelectOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const ref = useRef();
  const button_ref = useRef();
  const input_ref = useRef();

  useClickOutside(ref, () => {
    setSelectOpen(false);
    setInputValue("");
    setSelectedIndex(-1);
  });

  const can_bottom = useOnScreen(button_ref);

  const onChangeHandler = (item) => {
    setInputValue(item?.label);
    onChange(item);
    setSelectOpen(false);
    setInputValue("");
    setSelectedIndex(-1);
  };

  const onClickHandler = () => {
    if (input_ref.current) {
      input_ref.current.focus();
      setSelectOpen(true);
      onInputValueChange("", true);
    }
  };

  const onInputValueChange = async (value = "", init) => {
    setInputValue(value);
    clearTimeout(timer);

    timer = setTimeout(
      async () => {
        setLoading(true);
        await getData(value);
        setLoading(false);
      },
      !!init ? 0 : 500
    );
  };

  const onKeyDown = (e) => {
    if (!select_open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && options[selectedIndex]) {
        onChangeHandler(options[selectedIndex]);
      }
    }
  };

  useEffect(() => {
    if (select_open) {
      setSelectedIndex(-1);
    }
  }, [select_open]);

  return (
    <div
      id={id}
      ref={ref}
      className={classnames(mainClass, {
        [`${mainClass}--active`]: !!select_open,
        [`${mainClass}--selected`]: !!selected,
        [`${mainClass}--top`]: !!!can_bottom,
        [`${mainClass}--disabled`]: !!disabled,
        [`${mainClass}--error`]: !!is_error,
        [`${mainClass}--empty`]: !!!value?.label,
        [`${mainClass}--filled`]: !!value?.label || !!select_open,
        [`${mainClass}--${variant}`]: !!variant,
        [`${mainClass}--${size}`]: !!size,
      })}
    >
      <div className={`${mainClass}__content`}>
        {!!label && (
          <label>
            {label}
            {!!required && <span>*</span>}
          </label>
        )}
        <div
          ref={button_ref}
          className={`${mainClass}__content__button`}
          type="button"
          onClick={onClickHandler}
        >
          <div className={`${mainClass}__content__button__wrapper`}>
            {value?.hasOwnProperty("photo") && (
              <>
                {!!value?.label && (
                  <>
                    {value?.photo ? (
                      <img alt="" src={value?.photo} />
                    ) : (
                      <ProfilePlaceholder />
                    )}
                  </>
                )}
              </>
            )}

            <input
              type="text"
              ref={input_ref}
              value={inputValue}
              placeholder={!!value?.label ? value?.label : placeholder}
              onChange={(e) => onInputValueChange(e?.target?.value)}
              onKeyDown={onKeyDown}
            />
          </div>
          <div className={`${mainClass}__content__button__aside`}>
            {!!value?.label && (
              <IconButton
                onClick={() => onChangeHandler(null)}
                size="small"
                icon={<XMarkIcon />}
              />
            )}
            {!!!noArrow && <ChevronDownIcon />}
          </div>
        </div>
        {select_open && (
          <div className={`${mainClass}__options`}>
            <PerfectScrollbar
              options={{
                useBothWheelAxes: false,
                suppressScrollX: true,
              }}
            >
              {!!loading || !!!options?.length ? (
                <div className={`${mainClass}__loader`}>
                  {!!loading ? (
                    <div className="loader"></div>
                  ) : (
                    <span>No data</span>
                  )}
                </div>
              ) : (
                <>
                  {options?.map((item, index) => (
                    <button
                      type="button"
                      key={index}
                      className={classnames(`${mainClass}__options__item`, {
                        [`${mainClass}__options__item--selected`]:
                          selectedIndex === index,
                      })}
                      onClick={() => onChangeHandler(item)}
                    >
                      <>
                        {item?.hasOwnProperty("photo") && (
                          <>
                            {item?.photo ? (
                              <img alt="" src={item?.photo} />
                            ) : (
                              <ProfilePlaceholder />
                            )}
                          </>
                        )}
                        {item?.label}
                      </>
                    </button>
                  ))}
                </>
              )}
            </PerfectScrollbar>
          </div>
        )}
      </div>
      {!!is_error && <small className={`${mainClass}__error`}>{error}</small>}
    </div>
  );
};

export default AsyncSelect;
