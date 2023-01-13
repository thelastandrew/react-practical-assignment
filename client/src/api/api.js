import axios from 'axios';

const baseURL = 'http://localhost:8080';
const endpoints = {
  post: '/post',
  comment: '/comment',
};

const API = axios.create({
  baseURL,
});

export const postAPI = {
  getPosts: (pageNum) => API.get(`${endpoints.post}/page/${pageNum}`)
    .then(response => response.data),

  createPost: (title, username) => API.post(endpoints.post, { title, username })
    .then(response => response.data),
};