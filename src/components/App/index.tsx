import { TodoList } from "components/TodoList";
import { TodoStore, TodoStoreItem } from "store";
import styles from "./App.module.scss";

export const defaultItems: TodoStoreItem[] = [
  { text: "Тестовая задача", completed: false, key: Math.random() },
  { text: "Выполненная тестовая задача", completed: true, key: Math.random() },
  {
    text: "Тестовая задача с большим количеством текста, чтоб аж в одну строку не влезала и было понятно, что смотрится нормально (насколько я могу судить)",
    completed: false,
    key: Math.random()
  },
];

const localStorageKey = 'todoList';

export const App = () => {
  const localStorageItems: TodoStoreItem[] = JSON.parse(localStorage.getItem(localStorageKey)!) || defaultItems;
  const store = new TodoStore(localStorageKey, localStorageItems);
  return (
    <div className={styles.wrapper}>
      <TodoList store={store} />
    </div>
  );
};
