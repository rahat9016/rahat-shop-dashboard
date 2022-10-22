import { authConstance } from "../action/constance";

const initialState = {
  token: "",
  user: {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  },
  message: "",
  loading: false,
  error: null,
  authenticate: false,
};
export const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case authConstance.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstance.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        authenticate: true,
        loading: false,
      };
    case authConstance.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case authConstance.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstance.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    default:
      return state;
  }
};
