import { FormEvent, useEffect, useMemo, useState } from "react";
import { useTodoListContext } from "../../providers/TodoListcontext";
import { ListItem } from "./listItem";
import { Todo } from "../../types";

import "./todo.css";

export function TodoList() {
  const { todoList, dispatch } = useTodoListContext();
  const [filter, setFilter] = useState<string>("All");
  const [toggleAllInput, setToggleAllInput] = useState<boolean>(false);
  const [toggleAll, setToggleAll] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    dispatch({ type: "TOGGLEALL", toggleAll: toggleAll });
  }, [toggleAll, dispatch]);

  useEffect(() => {
    const allCompleted = todoList?.every((todo) => todo.complete);
    if (allCompleted) {
      setToggleAllInput(allCompleted);
    } else {
      setToggleAllInput(false);
    }
  }, [todoList]);

  const handleToggleAll = (e: any) => {
    setToggleAll(!toggleAll);
    setToggleAllInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      return;
    }
    dispatch({ type: "ADD", payload: { title: inputValue } });
    setInputValue("");
  };

  const completedTasks = useMemo(() => {
    return todoList?.filter((task) => task.complete) as Todo[];
  }, [todoList]);

  const unCompletedRasks = useMemo(() => {
    return todoList?.filter((task) => !task.complete) as Todo[];
  }, [todoList]);

  const renderTasks = useMemo(() => {
    let filteredTasks: Todo[] = [];
    if (filter === "All") {
      filteredTasks = todoList as Todo[];
    } else if (filter === "Active") {
      filteredTasks = todoList?.filter((task) => !task.complete) as Todo[];
    } else if (filter === "Completed") {
      filteredTasks = todoList?.filter((task) => task.complete) as Todo[];
    }

    return filteredTasks.map((task) => (
      <ListItem key={task.id} item={task} dispatch={dispatch} />
    ));
  }, [filter, todoList, dispatch]);

  return (
    <div className="todo-wrapper">
      <div className="todo-header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="todo-input"
            placeholder="what needs to be done"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={toggleAllInput}
          onChange={handleToggleAll}
        />
        {todoList?.length ? (
          <label htmlFor="toggle-all" className="toggle-all-label">
            All Completed
          </label>
        ) : null}
      </div>
      <div className="todo-main">{renderTasks}</div>
      <div className="todo-footer">
        <span>{unCompletedRasks.length} Items Left</span>
        <div className="filters">
          <button
            onClick={() => setFilter("All")}
            className={filter === "All" ? "filter-btn-active" : ""}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Active")}
            className={filter === "Active" ? "filter-btn-active" : ""}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("Completed")}
            className={filter === "Completed" ? "filter-btn-active" : ""}
          >
            Completed
          </button>
          {completedTasks.length ? (
            <button
              className="clear-complete"
              onClick={() => dispatch({ type: "DELETECOMPLETED" })}
            >
              Clear Complete
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
