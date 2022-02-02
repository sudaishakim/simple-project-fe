import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signIn = (form, navigate) => async (dispatch) => {
  try {
    // log in the user
    const { data } = await api.signIn(form);

    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (form, navigate) => async (dispatch) => {
  try {
    // sign up  the user
    const { data } = await api.signUp(form);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
