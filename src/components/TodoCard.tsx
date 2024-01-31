import { Todo } from "../Home";

export const TodoCard = ({ todo, onClick }: { todo: Todo; onClick: any }) => {
  if (!todo.id) return null;
  return (
    <button
      onClick={() => onClick(todo)}
      key={todo.id}
      className="h-10 my-5 bg-red-100 w-56 flex flex-row"
    >
      <div>{todo.id}</div>
      <div className="px-2">/</div>
      <div>{todo.title}</div>
      <div className="px-2">/</div>
      <div>{todo.isDone ? "done" : "not yet"} </div>
    </button>
  );
};
