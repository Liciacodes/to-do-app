import React, { useEffect, useState } from "react";
import { todoAppKey } from "./constant";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [checked, setIsChecked] = useState(false);

  const getTodos = () => {
    const todoListStr = localStorage.getItem(todoAppKey);
    const todoList = todoListStr ? JSON.parse(todoListStr) : [];
    setTodos(todoList);
  };

  function onDelete(id) {
    const filteredTodo = todos.filter((todo) => id !== todo.id);
    setTodos(filteredTodo);
    localStorage.setItem(todoAppKey, JSON.stringify(filteredTodo));
  }

  const handleChecked = (todo) => {
    const updatedTodo = {
      ...todo,
      done: !todo.done,
    };
    const updatedTodoList = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setTodos(updatedTodoList);
    localStorage.setItem(todoAppKey, JSON.stringify(updatedTodoList));
  };

  useEffect(() => {
    getTodos();
  }, [localStorage.getItem(todoAppKey)]);

  return (
    <div>
      <ol>
        {todos.map((todo) => (
          <li className={todo.done ? "done" : ""} key={todo.id}>
            {" "}
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleChecked(todo)}
            ></input>
            {todo.title} <span>{todo.createdAt}</span>{" "}
            <button onClick={() => onDelete(todo.id)}>delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Todos;
