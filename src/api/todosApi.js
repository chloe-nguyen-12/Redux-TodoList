import axiosClient from "./axiosClient";
export const todosApi = {
  getAll: () => {
    return axiosClient.get("/todos");
  },
  get: id => {
    const url = `/todos/${id}`;
    return axiosClient.get(url);
  },
  post: newTodo => {
    return axiosClient.post("/todos", newTodo);
  },
  put: (id, editTodo) => {
    const url = `/todos/${id}`;
    return axiosClient.put(url, editTodo);
  },
  delete: id => {
    const url = `/todos/${id}`;
    return axiosClient.delete(url);
  }
};
