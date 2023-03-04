import { couponConstance } from "../action/constance";

const initialState = {
  loading: false,
  message: "",
  coupon: [],
};
export const couponReducers = (state = initialState, action) => {
  switch (action.type) {
    case couponConstance.COUPON_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case couponConstance.COUPON_CREATE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case couponConstance.COUPON_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case couponConstance.GET_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        coupon: action.payload.coupon,
      };

    default:
      return state;
  }
};
