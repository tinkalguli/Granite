import axios from "axios";

const list = () => axios.get("/tasks");

const create = payload => axios.post("/tasks/", payload);

const show = id => axios.get(`/tasks/${id}`);

const update = ({ id, payload }) => axios.put(`/tasks/${id}`, payload);

const destroy = id => axios.delete(`/tasks/${id}`);

const tasksApi = {
  list,
  create,
  show,
  update,
  destroy,
};

export default tasksApi;
