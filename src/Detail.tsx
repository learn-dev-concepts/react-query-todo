import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTodo, updateTodos } from "./apis/todos";
import { Todo } from "./Home";

const Detail = () => {
  const { todoId } = useParams();
  const queryClient = useQueryClient();

  // 일부러 만들어본 케이스
  const { data: todo } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: ({ queryKey }) => {
      const id = queryKey[1];
      return id != undefined ? getTodo(id) : ({} as Todo);
    },
  });

  const mutation = useMutation({
    mutationFn: updateTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });

  const handleClick = async (todo?: Todo) => {
    if (todo == undefined) return;
    const newTodo = { ...todo, isDone: !todo.isDone };
    mutation.mutate(newTodo);
  };

  return (
    <button onClick={() => handleClick(todo)}>
      <div>{todo?.id}</div>
      <div>{todo?.title}</div>
      <div>{todo?.isDone ? "done" : "not yet"} </div>
    </button>
  );
};

export default Detail;
