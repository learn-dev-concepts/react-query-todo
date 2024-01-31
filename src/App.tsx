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

  return (
    <div className="bg-red-100 m-10">
      {todos.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
};

export default App;
