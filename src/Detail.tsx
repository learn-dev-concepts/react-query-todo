import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTodo } from "./apis/todos";
import { useEffect, useState } from "react";

const Detail = () => {
  const { todoId } = useParams();

  const [test, setTest] = useState<string>();

  useEffect(() => {
    setTest(todoId);
  });

  const { data: todo } = useQuery({
    queryKey: ["todo", test],
    queryFn: ({ queryKey }) => {
      const [key, id] = queryKey;
      return id != undefined ? getTodo(id) : null;
    },
  });

  return (
    <div>
      <div>{todo?.id}</div>
      <div>{todo?.title}</div>
      <div>{todo?.isDone ? "done" : "not yet"} </div>
    </div>
  );
};

export default Detail;
