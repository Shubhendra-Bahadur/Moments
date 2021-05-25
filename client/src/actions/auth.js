import { AUTH } from "../constants/actionTypes";
import * as api from "../api";
import { errorToast, successToast } from "../components/Toastify/Tostify";

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type:AUTH, data });

    history.push("/");
    successToast('Login Succesfully');
  } catch (error) {
    console.log(error);
    if (formData.password !== formData.confirmPassword) {
      errorToast("password not matching");
    }else{
      errorToast("Email Id already registered");
    }
  }
};

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: AUTH, data });
    
    history.push("/");
    successToast('Login Succesfully');
  } catch (error) {
    console.log(error);
    errorToast('Invalid Credentials');
  }
};
