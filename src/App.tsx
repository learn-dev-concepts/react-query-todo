import React, { useEffect, useState } from "react";

import { getTodos, updateTodos } from "./apis/todos";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Todo {
  id: string;
  title: string;
  isDone: boolean;
}

const App = () => {
  const queryClient = useQueryClient();

  const { data: todos } = useQuery({
    initialData: [],
    queryKey: ["todo"],
    queryFn: getTodos,
  });

  const handleClick = async (todo: Todo) => {
    const newTodo = { ...todo, isDone: !todo.isDone };

    await updateTodos(newTodo);
    queryClient.invalidateQueries({ queryKey: ["todo"] });
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
