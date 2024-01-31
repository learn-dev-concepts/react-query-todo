import axios from "axios";

const url = "http://localhost:4000/todos";

export const getTodos = async () => {
  const res = await axios(url, { method: "GET" });
  const data = res.data;

  return data;
};
