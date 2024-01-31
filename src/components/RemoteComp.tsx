import { useMutationState } from "@tanstack/react-query";
import { TodoCard } from "./TodoCard";

const RemoteComp = () => {
  const variables = useMutationState({
    filters: { mutationKey: ["addTodo"], status: "pending" },
    select: (mutation) => mutation.state.variables,
  });

  return <TodoCard todo={(variables[0] ?? {}) as any} onClick={() => {}} />;
};

export default RemoteComp;
