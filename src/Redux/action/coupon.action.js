import axios from "../../helpers/axios";
import { couponConstance } from "./constance";

export const createCoupon = (name, expiry, discount) => {
  return async (dispatch) => {
    dispatch({
      type: couponConstance.COUPON_CREATE_REQUEST,
    });
    await axios
      .post("/coupon", {
        name,
        expiry,
        discount,
      })
      .then((res) => {
        dispatch({
          type: couponConstance.COUPON_CREATE_SUCCESS,
          payload: {
            message: res.data.message,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: couponConstance.COUPON_CREATE_FAILURE,
          payload: {
            message: error.response.data?.message,
          },
        });
      });
  };
};
export const getCoupon = () => {
  return async (dispatch) => {
    await axios.get("/coupon").then((res) => {
      dispatch({
        type: couponConstance.GET_COUPON_SUCCESS,
        payload: {
          coupon: res.data.coupon,
        },
      });
    });
  };
};
export const deleteCoupon = (id) => {
  return async (dispatch) => {
    await axios.delete(`/coupon/${id}`).then((res) => {
      dispatch({
        type: couponConstance.DELETE_COUPON_SUCCESS,
      });
    });
  };
};
