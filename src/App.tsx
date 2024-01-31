import React, { useEffect, useState } from "react";

import { getTodos } from "./apis/todos";

interface Todo {
  id: number;
  title: string;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const handleClick = (todo: Todo) => {
    console.log("id: >> ", todo.id);
  };

  return (
    <div className="m-10">
      {todos.map((todo) => (
        <button
          onClick={() => handleClick(todo)}
          key={todo.id}
          className="h-10 my-5 bg-red-100 w-56 flex flex-col"
        >
          <div>{todo.id}</div>
          <div>{todo.title}</div>
        </button>
      ))}
    </div>
  );
};

export default App;
