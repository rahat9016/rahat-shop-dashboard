import { brandConstance } from "../action/constance";

const initialState = {
  brands: [],
  loading: false,
};
export const brandReducers = (state = initialState, action) => {
  switch (action.type) {
    case brandConstance.GET_ALL_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case brandConstance.GET_ALL_BRAND_SUCCESS:
      return {
        ...state,
        brands: action.payload.brands,
        loading: false,
      };
    default:
      return state;
  }
};
