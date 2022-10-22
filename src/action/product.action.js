import axios from "../helpers/axios";
import { productConstance } from "./constance";

export const addProduct = (form) => {
  return async (dispatch) => {
    dispatch({
      type: productConstance.CREATE_PRODUCT_REQUEST,
    });
    try {
      const res = await axios.post("/admin/product/create", form);
      if (res.status === 201) {
        dispatch({
          type: productConstance.CREATE_PRODUCT_SUCCESS,
          payload: {
            message: res.data.message,
            product: res.data.product,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: productConstance.GET_PRODUCT_REQUEST,
    });
    const res = await axios.get("/get-all-products");
    if (res.status === 200) {
      dispatch({
        type: productConstance.GET_PRODUCT_SUCCESS,
        payload: {
          products: res.data.products,
        },
      });
    } else {
      dispatch({
        type: productConstance.GET_PRODUCT_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};
export const getProductById = (id) => {
  return async (dispatch) => {
    dispatch({
      type: productConstance.FIND_PRODUCT_BY_ID_REQUEST,
    });
    try {
      await axios.get(`/product/${id}`).then((res) => {
        if (res.status === 200) {
          dispatch({
            type: productConstance.FIND_PRODUCT_BY_ID_SUCCESS,
            payload: { product: res.data.product },
          });
        }
      });
    } catch (error) {
      dispatch({
        type: productConstance.FIND_PRODUCT_BY_ID_FAILURE,
      });
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch({
      type: productConstance.DELETE_PRODUCT_REQUEST,
    });
    try {
      const res = await axios.delete(`/admin/product/delete/${id}`);
      if (res.status === 204) {
        dispatch({
          type: productConstance.DELETE_PRODUCT_SUCCESS,
        });
      }
    } catch (error) {}
  };
};
export const updateProduct = (id, form) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/admin/product/update/${id}`, form);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
};
export const getProductForPagination = (query, page, perPage) => {
  // console.log({ query, page });
  return async (dispatch) => {
    dispatch({ type: productConstance.GET_PRODUCT_FOR_PAGINATION_REQUEST });
    const res = await axios.post("/products", { query, page, perPage });
    // console.log(res.data);
    if (res.status === 200) {
      dispatch({
        type: productConstance.GET_PRODUCT_FOR_PAGINATION_SUCCESS,
        payload: {
          paginationProduct: res.data.products,
        },
      });
    }
  };
};
export const getProductCount = () => {
  return async (dispatch) => {
    dispatch({ type: productConstance.GET_PRODUCT_COUNT_REQUEST });
    const res = await axios.get("/products/total");
    if (res.status === 200) {
      dispatch({
        type: productConstance.GET_PRODUCT_COUNT_SUCCESS,
        payload: {
          getTotalProduct: res.data.total,
        },
      });
    }
  };
};
