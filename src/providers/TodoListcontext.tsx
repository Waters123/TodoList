import { useContext, useReducer, createContext } from "react";
import { Todo, TodoListAction, TodoListContextValue } from "../types";

const TodoListContext = createContext<TodoListContextValue | undefined>(
  undefined
);

const InitialState: [] = [];
let maxId = 0;

const reducer = (state: Todo[], action: TodoListAction) => {
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo: Todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    case "ADD":
      const newTodo = { ...action.payload, id: maxId + 1, complete: false };
      maxId = newTodo.id;
      return [...state, newTodo];
    case "DELETECOMPLETED":
      return state.filter((todo) => !todo.complete);
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload.id);
    case "TOGGLEALL":
      return state.map((todo: Todo) => {
        return { ...todo, complete: action.toggleAll };
      });
    default:
      return state;
  }
};

function TodoListProvider(props: any) {
  const [todoList, dispatch] = useReducer(reducer, InitialState);
  return <TodoListContext.Provider value={{ todoList, dispatch }} {...props} />;
}

const useTodoListContext = (): TodoListContextValue => {
  const context = useContext(TodoListContext);
  if (!context) {
    throw new Error(
      "useTodoListContext must be used within a TodoListProvider"
    );
  }
  return context;
};

export { TodoListProvider, useTodoListContext };
