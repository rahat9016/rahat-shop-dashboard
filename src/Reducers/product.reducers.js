import { productConstance } from "../action/constance";

// get all products state
const initialState = {
  products: [],
  loading: false,
  error: "",
  product: [],
  paginationProduct: [],
  filterProducts: [],
  totalProducts: 0,
};

// get all product function
export const productsReducers = (state = initialState, action) => {
  switch (action.type) {
    case productConstance.GET_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productConstance.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
      };
    case productConstance.GET_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        products: action.payload.error,
      };
    case productConstance.FIND_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productConstance.FIND_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        product: action.payload.product,
        loading: false,
      };
    case productConstance.FIND_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case productConstance.GET_PRODUCT_FOR_PAGINATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productConstance.GET_PRODUCT_FOR_PAGINATION_SUCCESS:
      return {
        ...state,
        paginationProduct: action.payload.paginationProduct,
        loading: false,
      };
    case productConstance.GET_PRODUCT_COUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case productConstance.GET_PRODUCT_COUNT_SUCCESS:
      return {
        ...state,
        totalProducts: action.payload.getTotalProduct,
        loading: false,
      };
    default:
      return state;
  }
};
