import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";
import { errorToast, successToast } from "../components/Toastify/Tostify";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    const action = {
      type: FETCH_ALL,
      payload: data,
    };

    dispatch(action);
  } catch (error) {
    console.log("getPost error", error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    successToast('Moment created')
  } catch (error) {
    console.log("createPost error", error);
    errorToast('Something went wrong moment creation')
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
    successToast('Deleted Succesfully');
    
  } catch (error) {
    console.log("error deletePost", error);
    errorToast('Error in deleting moment');
  }
};
