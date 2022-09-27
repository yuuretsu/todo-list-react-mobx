import clsx from "clsx";
import { observer } from "mobx-react";
import styles from "./RadioSelect.module.scss";
import indexStyles from "index.module.scss";

export type SelectOptions<T extends string> = { value: T, title: string }[];

type Props<T extends string, U extends SelectOptions<T>> = {
  options: U,
  selected: T,
  onChange: (selected: T) => any,
}

export const RadioSelect = observer(<T extends string, U extends SelectOptions<T>>({
  options,
  selected,
  onChange
}: Props<T, U>) => {
  const name = String(Math.random());
  const elements = options
    .map(({ value, title }) => {
      const isSelected = value === selected;
      return (
        <label
          key={value}
          className={clsx(styles.option, isSelected && styles.selected)}
        >
          <input
            type="radio"
            className={indexStyles.visuallyHidden}
            name={name}
            value={value}
            checked={isSelected}
            onChange={() => onChange(value)}
          />
          <span className={styles.title}>{title}</span>
        </label>
      );
    });
  return <div className={styles.radioSelect}>{elements}</div>;
});

