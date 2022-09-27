import { useState, FC } from 'react';
import { observer } from 'mobx-react';
import { TodoStoreContext, ITodoStore } from "store";
import { TodoItemsList, FilterOption } from 'components/TodoList/TodoItemList';
import { TodoNewItemInput } from 'components/TodoList/TodoNewItemInput';
import { RadioSelect, SelectOptions } from 'components/RadioSelect';
import styles from './TodoList.module.scss';

type Props = {
  store: ITodoStore
};

const filters: SelectOptions<FilterOption> = [
  { value: 'allItems', title: 'Все' },
  { value: 'completedItems', title: 'Выполненные' },
  { value: 'notCompletedItems', title: 'Невыполненные' },
];

export const TodoList: FC<Props> = observer(({ store }) => {
  const [filter, setFilter] = useState<FilterOption>('allItems');

  return (
    <TodoStoreContext.Provider value={store}>
      <h1 className={styles.appTitle}>ToDo List</h1>
      <RadioSelect
        selected={filter}
        options={filters}
        onChange={(value) => setFilter(value)}
      />
      <TodoItemsList filter={filter} />
      <TodoNewItemInput />
    </TodoStoreContext.Provider>
  );
});
