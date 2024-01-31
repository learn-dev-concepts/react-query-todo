import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodo, getTodos } from "./apis/todos";

export interface Todo {
  id: string;
  title: string;
  isDone: boolean;
}

const Home = () => {
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const { data: todos } = useQuery({
    initialData: [],
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleClickAdd = async () => {
    const newTodo = {
      id: "10",
      title: "hi",
      isDone: false,
    };

    mutation.mutate(newTodo);
  };

  const handleClick = async (todo: Todo) => {
    navigation(`/post/${todo.id}`);
  };

  return (
    <div className="m-10">
      <button onClick={handleClickAdd}>add</button>
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

export default Home;
