import { FC } from "react";
import { observer } from 'mobx-react';
import { TodoStoreItem, useTodoStore } from "store";
import clsx from "clsx";
import styles from "./TodoItem.module.scss";
import indexStyle from "index.module.scss";

const { visuallyHidden } = indexStyle;

type TodoItemCheckboxProps = {
  item: TodoStoreItem,
};

const TodoItemCheckbox: FC<TodoItemCheckboxProps> = ({ item }) => {
  const store = useTodoStore();
  return (
    <input
      type="checkbox"
      className={styles.checkbox}
      defaultChecked={item.completed}
      onChange={() => store.toggle(item)}
    />
  );
};

type Props = {
  item: TodoStoreItem,
};

export const TodoItem: FC<Props> = observer(({ item }) => {
  function onClickDelete() {
    store.remove(item);
  }
  const store = useTodoStore();
  return (
    <li className={styles.wrapper}>
      <TodoItemCheckbox item={item} />
      <span className={clsx(styles.title, item.completed && styles.completed)}>{item.text}</span>
      <button className={styles.delete} onClick={onClickDelete} title="Удалить">
        <span className={visuallyHidden}>Удалить задачу</span>
      </button>
    </li>
  );
});