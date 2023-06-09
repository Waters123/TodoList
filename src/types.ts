import { Dispatch } from "react";

export interface Todo {
  id: number;
  title: string;
  complete: boolean;
}

export interface TodoListContextValue {
  todoList: Todo[] | undefined;
  dispatch: Dispatch<any>;
}

export interface TodoListAction {
  type: string;
  payload: { title: string; id: number };
  toggleAll: boolean;
}
