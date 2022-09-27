import { createContext, useContext } from "react";
import { makeAutoObservable } from "mobx";

export type TodoStoreItem = {
  text: string,
  completed: boolean,
  key: number
}

export interface ITodoStore {
  allItems: TodoStoreItem[];
  completedItems: TodoStoreItem[];
  notCompletedItems: TodoStoreItem[];
  add(text: string): void;
  remove(item: TodoStoreItem): void;
  toggle(item: TodoStoreItem): void;
}

export class TodoStore implements ITodoStore {
  private elements: Set<TodoStoreItem>;
  constructor(
    readonly localStorageKey: string,
    items: TodoStoreItem[] = []
  ) {
    this.elements = new Set(items);
    makeAutoObservable(this);
  }
  get allItems() {
    return Array.from(this.elements);
  }
  get completedItems() {
    return this.allItems.filter(({ completed }) => completed);
  }
  get notCompletedItems() {
    return this.allItems.filter(({ completed }) => !completed);
  }
  private saveToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.allItems));
  }
  add(text: string): void {
    this.elements.add({
      text,
      completed: false,
      key: Math.random(),
    });
    this.saveToLocalStorage();
  }
  remove(item: TodoStoreItem): void {
    this.elements.delete(item);
    this.saveToLocalStorage();
  }
  toggle(item: TodoStoreItem): void {
    item.completed = !item.completed;
    this.saveToLocalStorage();
  }
}

export const TodoStoreContext = createContext<ITodoStore | null>(null);

export const useTodoStore = () => {
  const context = useContext(TodoStoreContext);
  if (context === null) throw new Error("You have forgotten to wrap TodoList component with TodoStoreContext.Provider");
  return context;
};