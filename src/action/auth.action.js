import axios from "../helpers/axios";
import { authConstance } from "./constance";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstance.LOGIN_REQUEST,
    });
    const res = await axios.post("/admin/user/signing", { ...user });
    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstance.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstance.LOGIN_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    }
  };
};
export const signup = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstance.SIGNUP_REQUEST,
    });
    const res = await axios.post("/admin/user/signup", { ...user });
    console.log(res.data);
    if (res.status === 201) {
      const { message } = res.data;
      dispatch({
        type: authConstance.SIGNUP_SUCCESS,
        payload: {
          message,
        },
      });
    } else if (res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: authConstance.SIGNUP_FAILURE,
        payload: {
          message,
        },
      });
    }
  };
};
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const user = JSON.stringify(localStorage.getItem("user"));
      dispatch({
        type: authConstance.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstance.LOGIN_FAILURE,
        payload: {
          error: "Failed to login",
        },
      });
    }
  };
};
export const signOut = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstance.SIGNOUT_REQUEST,
    });
    const res = await axios.post("/admin/user/signOut");
    if (res.status === 200) {
      window.localStorage.clear();
      dispatch({
        type: authConstance.SIGNOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: authConstance.SIGNOUT_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};
