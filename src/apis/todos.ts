import axios from "axios";
import { Todo } from "../Home";

const baseUrl = "http://localhost:4000/todos";

interface TodoResponse {
  id: string;
  title: string;
  isDone: boolean;
}

const log = (msg: string) => console.log(`execute ${msg} method`);

export const getTodo = async (id: string): Promise<TodoResponse> => {
  console.log("id: >>", id);
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

let lastId = 0;
export const addTodo = async (todo: TodoResponse) => {
  await delay(2000);
  if (Number(lastId) === Number(todo.id)) {
    throw new Error("dup");
  }

  const res = await axios.post(baseUrl, todo);
  lastId = res.data.id;
  return res.data;
};

const delay = (d: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, d);
  });
