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

  const { mutate, isPending, variables } = useMutation({
    mutationKey: ["addTodo"],
    mutationFn: addTodo,
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

    mutate(newTodo);
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
      <RemoteComp />
    </div>
  );
};

const RemoteComp = () => {
  const variables = useMutationState({
    filters: { mutationKey: ["addTodo"], status: "pending" },
    select: (mutation) => mutation.state.variables,
  });

  return <TodoCard todo={(variables[0] ?? {}) as any} onClick={() => {}} />;
};

export default Home;
