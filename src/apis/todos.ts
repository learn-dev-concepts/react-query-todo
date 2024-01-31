import axios from "axios";

const url = "http://localhost:4000/todos";

interface TodoResponse {
  id: string;
  title: string;
}

export const getTodos = async (): Promise<TodoResponse[]> => {
  const res = await axios(url, { method: "GET" });
  const data = res.data;

  return data;
};
