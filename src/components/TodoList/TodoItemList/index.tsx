import { FC } from 'react';
import { observer } from 'mobx-react';
import { useTodoStore } from 'store';
import { TodoItem } from 'components/TodoList/TodoItemList/TodoItem';
import styles from './TodoItemList.module.scss';

export type FilterOption = "allItems" | "completedItems" | "notCompletedItems";

type Props = {
  filter?: FilterOption,
};

export const TodoItemsList: FC<Props> = observer(({
  filter = "allItems"
}) => {
  const store = useTodoStore();
  const todoItemsElements = store[filter]
    .map(todoItem => <TodoItem item={todoItem} key={todoItem.key} />);

  const innerElement = todoItemsElements.length
    ? <ul className={styles.todoItemList}>{todoItemsElements}</ul>
    : <div className={styles.placeholder}>Нет подходящих задач для просмотра</div>;

  return (
    <div className={styles.wrapper}>
      {innerElement}
    </div>
  );
});
