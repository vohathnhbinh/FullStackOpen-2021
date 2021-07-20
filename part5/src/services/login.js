import axios from 'axios';
const baseUrl = '/api/login';

const login = (credential) => {
  const req = axios.post(baseUrl, credential);
  return req.then((res) => res.data);
};

const service = {
  login,
};

export default service;
