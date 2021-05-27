import axios from "axios";

const API = axios.create({ baseURL: "https://moments-application-project.herokuapp.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPost=(id)=> API.get(`/posts/${id}`)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatePost) =>
  API.patch(`${"/posts"}/${id}`, updatePost);
export const deletePost = (id) => API.delete(`${"/posts"}/${id}`);
export const likePost = (id) => API.patch(`${"/posts"}/${id}/likePost`);

export const signin = (formData) => API.post("/users/signin", formData);
export const signup = (formData) => API.post("/users/signup", formData);
