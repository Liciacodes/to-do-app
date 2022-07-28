import { useState } from "react";
import { v4 } from "uuid";
import "./App.css";
import { todoAppKey } from "./constant";
import Todos from "./Todos";

function App() {
  const [todoName, setTodoName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!todoName) return;

    const data = {
      title: todoName,
      done: false,
      createdAt: new Date(),
      id: v4()
    };

    const todoListStr = localStorage.getItem(todoAppKey);

    const todoList = todoListStr ? JSON.parse(todoListStr) : [];

    todoList.push(data);
    localStorage.setItem(todoAppKey, JSON.stringify(todoList));
    setTodoName("");
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <Todos />
    </div>
  );
}

export default App;
