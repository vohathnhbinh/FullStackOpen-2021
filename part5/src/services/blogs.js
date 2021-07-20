import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

let config = {
  headers: { Authorization: token },
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  config.headers.Authorization = token;
};

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = (newBlog) => {
  const req = axios.post(baseUrl, newBlog, config);
  return req.then((res) => res.data);
};

const update = (updatedBlog) => {
  const req = axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config);
  return req.then((res) => res.data);
};

const remove = (blogId) => {
  const req = axios.delete(`${baseUrl}/${blogId}`, config);
  return req.then((res) => res.data);
};

const service = {
  setToken,
  getAll,
  create,
  update,
  remove,
};

export default service;
