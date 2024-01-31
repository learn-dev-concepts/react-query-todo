import axios from "axios";

const baseUrl = "http://localhost:4000/todos";

interface TodoResponse {
  id: string;
  title: string;
  isDone: boolean;
}

const log = (msg: string) => console.log(`execute ${msg} method`);

export const getTodos = async (): Promise<TodoResponse[]> => {
  log("get");
  const res = await axios.get(baseUrl);

  return res.data;
};

export const updateTodos = async (todo: TodoResponse) => {
  log("put");
  const url = `${baseUrl}/${todo.id}`;
  const res = await axios.put(url, todo);

  return res.data;
};
