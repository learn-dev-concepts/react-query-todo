import React, { useEffect, useState } from "react";

import { getTodos } from "./apis/todos";
import { useQueries, useQuery } from "@tanstack/react-query";

interface Todo {
  id: string;
  title: string;
  isDone: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then((todoArr) => todoArr.map((todo) => ({ ...todo, isDone: false })))
      .then(setTodos);
  }, []);

  // const { data } = useQuery({
  //   queryKey: ["todo"],
  //   queryFn: getTodos,
  // });

  const handleClick = (todo: Todo) => {
    const newTodo = { ...todo, isDone: !todo.isDone };
    const newList = todos.map((t) => (t.id === newTodo.id ? newTodo : t));

    setTodos(newList);
  };

  return (
    <div className="m-10">
      {todos.map((todo) => (
        <button
          onClick={() => handleClick(todo)}
          key={todo.id}
          className="h-10 my-5 bg-red-100 w-56 flex flex-row"
        >
          <div>{todo.id}</div>
          <div className="px-2">/</div>
          <div>{todo.title}</div>
          <div className="px-2">/</div>
          <div>{todo.isDone ? "done" : "not yet"} </div>
        </button>
      ))}
    </div>
  );
};

export default App;
