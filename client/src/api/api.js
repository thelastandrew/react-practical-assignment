import axios from 'axios';

const baseURL = 'http://localhost:8080';
const endpoints = {
  post: '/post',
  postPage: '/post/page',
  searchPost: '/post/search',
  picture: './picture',
  comment: '/comment',
};

const API = axios.create({
  baseURL,
});

export const postAPI = {
  getPosts: (pageNum) => API.get(`${endpoints.postPage}/${pageNum}`)
    .then(response => response.data),

  createPost: (title, username) => API.post(endpoints.post, { title, username })
    .then(response => response.data),

  deletePost: (id) => API.delete(`${endpoints.post}/${id}`)
    .then(response => response.data),

  updatePost: ( id, title, likes, dislikes) => API.put(`${endpoints.post}/${id}`, { title, likes, dislikes })
    .then(response => response.data),

  uploadPostPicture: (id, formData) => API.post(`${endpoints.post}/${id}/picture`, formData)
    .then(response => response.data),
  filterPosts: (keyword) => API.get(`${endpoints.searchPost}/${keyword}`)
    .then(response => response.data),
};