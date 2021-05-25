import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type:AUTH, data });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signin = (formData, history) => async (dispatch) => {
  try {
    console.log('hj',formData);

    
    const { data } = await api.signin(formData);
    console.log('hj1',data);
    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
