import axios from "../../helpers/axios";
import { categoryConstance } from "./constance";

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstance.CREATE_CATEGORY_REQUEST,
    });
    try {
      await axios.post("/category", form).then((res) => {
        if (res.status === 201) {
          dispatch({
            type: categoryConstance.CREATE_CATEGORY_SUCCESS,
            payload: {
              message: res.data.message,
              category: res.data.category,
            },
          });
          dispatch(getCategory());
        } else {
          dispatch({
            type: categoryConstance.CREATE_CATEGORY_FAILURE,
            payload: {
              error: res.data.error,
            },
          });
        }
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const getCategory = () => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstance.GET_CATEGORY_REQUEST,
    });
    try {
      await axios.get("/category").then((res) => {
        if (res.status === 200) {
          dispatch({
            type: categoryConstance.GET_CATEGORY_SUCCESS,
            payload: {
              categories: res.data.category,
            },
          });
        }
      });
    } catch (error) {}
  };
};
//Update Category
export const updateCategory = (form, id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: categoryConstance.UPDATE_CATEGORY_REQUEST,
      });
      const res = await axios.post(`/category/${id}`, form);
      if (res.status === 200) {
        dispatch(getCategory());
      }
    } catch (error) {}
  };
};

//Delete Category

export const deleteCategory = (id) => {
  return async (dispatch) => {
    const res = await axios.delete(`/category/${id}`);
    if (res.status === 204) {
      dispatch({
        type: categoryConstance.DELETE_CATEGORY_SUCCESS,
        payload: res.data.deleteItem,
      });
      dispatch(getCategory());
    }
  };
};
