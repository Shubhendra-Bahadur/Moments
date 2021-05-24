import { combineReducers } from "redux";
// import Posts from '../components/Posts/Posts';
import posts from "./posts";
import authReducer from './auth'

export const reducers = combineReducers({
  posts,
  authReducer
});
