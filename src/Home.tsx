import { useNavigate } from "react-router-dom";
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { addTodo, getTodos } from "./apis/todos";
import { TodoCard } from "./components/TodoCard";

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
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData(["todos"]);
      queryClient.setQueryData(["todos"], (old: Todo[]) => [...old, newTodo]);

      return { previousTodos };
    },
    onError: (err, newTodo, context: any) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      console.log("settled");
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
        <TodoCard key={todo.id} todo={todo} onClick={handleClick} />
      ))}
    </div>
  );
};

export default Home;
