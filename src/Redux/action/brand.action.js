import axios from "../../helpers/axios";
import { brandConstance } from "./constance";
export const getBrands = () => {
  return async (dispatch) => {
    dispatch({
      type: brandConstance.GET_ALL_BRAND_REQUEST,
    });
    const res = await axios.get("/get-brand");
    if (res.status === 200) {
      dispatch({
        type: brandConstance.GET_ALL_BRAND_SUCCESS,
        payload: {
          brands: res.data.brands,
        },
      });
    }
  };
};
export const createBrand = (form) => {
  return async (dispatch) => {
    dispatch({
      type: brandConstance.CREATE_BRAND_REQUEST,
    });
    const res = await axios.post("/brand/create", form);
    if (res.status === 201) {
      dispatch(getBrands());
    }
    console.log(res);
  };
};
export const deleteBrand = (id) => {
  return async (dispatch) => {
    dispatch({
      type: brandConstance.BRAND_DELETE_REQUEST,
    });
    const res = await axios.delete(`/brand/${id}`);
    if (res.status === 200) {
      dispatch(getBrands());
    }
  };
};
