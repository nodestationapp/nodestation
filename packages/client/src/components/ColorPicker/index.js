import "./styles.scss";

import cx from "classnames";

const mainClass = "color-picker";

const colors = [
  "#6E5B39",
  "#656E39",
  "#5A5A5A", // Zamieniony zielony na szarawy
  "#426E39",
  "#396E45",
  "#396E54",
  "#396A6E",
  "#395B6E",
  "#394C6E",
  "#46396E",
  "#57396E",
  "#65396E",
  "#6E3962",
  "#6E3B39",
];

const ColorPicker = ({ value, extraInput, onColorChange }) => {
  console.log(value);
  return (
    <div className={mainClass}>
      {extraInput}
      <div className={`${mainClass}__content`}>
        {colors?.map((item, index) => {
          console.log(item);
          return (
            <button
              key={index}
              type="button"
              onClick={() => onColorChange(item)}
              className={cx(`${mainClass}__content__item`, {
                [`${mainClass}__content__item--active`]: item === value,
              })}
              style={{ backgroundColor: item }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColorPicker;
