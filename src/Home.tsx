import { getTodos, updateTodos } from "./apis/todos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Todo {
  id: string;
  title: string;
  isDone: boolean;
}

const Home = () => {
  const queryClient = useQueryClient();

  const { data: todos } = useQuery({
    initialData: [],
    queryKey: ["todo"],
    queryFn: getTodos,
  });

  const mutation = useMutation({
    mutationFn: updateTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });

  const handleClick = async (todo: Todo) => {
    const newTodo = { ...todo, isDone: !todo.isDone };
    mutation.mutate(newTodo);
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

export default Home;
