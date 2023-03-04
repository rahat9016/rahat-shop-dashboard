import { categoryConstance } from "../action/constance";

const initialState = {
  loading: false,
  message: "",
  error: "",
  categories: [],
};

export const categoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case categoryConstance.CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConstance.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case categoryConstance.CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case categoryConstance.GET_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConstance.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.categories,
      };
    case categoryConstance.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
