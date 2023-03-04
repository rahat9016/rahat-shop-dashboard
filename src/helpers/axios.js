import axios from "axios";
import { authConstance } from "../Redux/action/constance";
import store from "../Redux/store";
import { api } from "../urlConfig";
const token = window.localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
axiosInstance.interceptors.request.use(function (req) {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  (error) => {
    const { status } = error.response;
    if (status === 500 || status === 400) {
      window.localStorage.clear();
      store.dispatch({
        type: authConstance.SIGNOUT_SUCCESS,
      });
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
