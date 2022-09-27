import { FC, useState } from 'react';
import { useTodoStore } from 'store';
import styles from './TodoNewItemInput.module.scss';
import indexStyles from 'index.module.scss';

export const TodoNewItemInput: FC = () => {
  function handleAddTask() {
    const formattedInputText = inputText.trim();
    if (!formattedInputText) return;
    todoStore.add(formattedInputText);
    setInputText('');
  }

  const todoStore = useTodoStore();

  const [inputText, setInputText] = useState('');

  return (
    <div className={styles.todoNewItemInput}>
      <input
        type="text"
        className={styles.input}
        value={inputText}
        onChange={({ target }) => setInputText(target.value)}
        onKeyDown={({ code }) => code === 'Enter' && handleAddTask()}
        placeholder="Введите текст задачи..."
      />
      {inputText.trim() && (
        <button className={styles.buttonAdd} onClick={handleAddTask} title="Добавить">
          <span className={indexStyles.visuallyHidden}>Добавить задачу</span>
        </button>
      )}
    </div>
  );
};

