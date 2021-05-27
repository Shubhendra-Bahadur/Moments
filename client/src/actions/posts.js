import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_SEARCH_POST,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from "../constants/actionTypes";
import { errorToast, successToast } from "../components/Toastify/Tostify";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    const action = {
      type: FETCH_ALL,
      payload: data,
    };

    dispatch(action);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log("getPost error", error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    const action = {
      type: FETCH_POST,
      payload: data,
    };
    dispatch(action);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log("getPost error", error);
  }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostBySearch(searchQuery);
    dispatch({ type: FETCH_SEARCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    console.log(data);
    dispatch({ type: CREATE, payload: data });
    history.push(`/posts/${data._id}`);
    successToast("Moment created");
  } catch (error) {
    console.log("createPost error", error);
    errorToast("Something went wrong moment creation");
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log("error", error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log("error updatePost", error);
  }
};

export const deletePost = (id, post) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
    successToast("Deleted Succesfully");
  } catch (error) {
    console.log("error deletePost", error);
    errorToast("Error in deleting moment");
  }
};
