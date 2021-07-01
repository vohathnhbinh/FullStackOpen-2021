import axios from 'axios';

const url = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(url);
};

const create = newObject => {
  return axios.post(url, newObject);
};

const update = (id, updatedObject) => {
  return axios.put(`${url}/${id}`, updatedObject);
}

const remove = (id) => {
  return axios.delete(`${url}/${id}`);
};

const service = {getAll, create, update, remove};

export default service;