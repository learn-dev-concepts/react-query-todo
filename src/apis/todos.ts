import axios from "axios";

const baseUrl = "http://localhost:4000/todos";

interface TodoResponse {
  id: string;
  title: string;
  isDone: boolean;
}

const log = (msg: string) => console.log(`execute ${msg} method`);

export const getTodo = async (id?: string): Promise<TodoResponse> => {
  console.log("id: >>", id);
  if (!id) return {} as TodoResponse;
  const url = `${baseUrl}/${id}`;
  const res = await axios.get(url);
  return res.data;
};

export const getTodos = async (): Promise<TodoResponse[]> => {
  log("get");
  const res = await axios.get(baseUrl);

  return res.data;
};

export const updateTodos = async (todo: TodoResponse) => {
  log("put");
  console.log("params: >>", todo);
  const url = `${baseUrl}/${todo.id}`;
  const res = await axios.put(url, todo);

  return res.data;
};
