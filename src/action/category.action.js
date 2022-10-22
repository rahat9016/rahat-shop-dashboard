import axios from "../helpers/axios";
import { categoryConstance } from "./constance";

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstance.CREATE_CATEGORY_REQUEST,
    });
    try {
      const res = await axios.post("/admin/category/create", form);
      if (res.status === 201) {
        dispatch({
          type: categoryConstance.CREATE_CATEGORY_SUCCESS,
          payload: {
            message: res.data.message,
          },
        });
      } else {
        dispatch({
          type: categoryConstance.CREATE_CATEGORY_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
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
      const res = await axios.get("/category/getCategory");
      if (res.status === 200) {
        dispatch({
          type: categoryConstance.GET_CATEGORY_SUCCESS,
          payload: {
            categories: res.data.category,
          },
        });
      }
    } catch (error) {}
  };
};
//Update Category
export const updateCategory = (form) => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstance.UPDATE_CATEGORY_REQUEST,
    });
    const res = await axios.post("/admin/category/update", form);
    console.log(res);
  };
};

//Delete Category

export const deleteCategory = (ids) => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstance.DELETE_CATEGORY_REQUEST,
    });
    const res = await axios.post("/admin/category/delete", {
      payload: { ids },
    });
    if (res.status === 204) {
      dispatch({
        type: categoryConstance.DELETE_CATEGORY_SUCCESS,
      });
    } else {
      dispatch({
        type: categoryConstance.DELETE_CATEGORY_FAILURE,
      });
    }
  };
};
