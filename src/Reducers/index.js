import { combineReducers } from "redux";
import { authReducers } from "./auth.reducers";
import { categoryReducers } from "./category.reducers";
import { productsReducers } from "./product.reducers";

const rootReducer = combineReducers({
  auth: authReducers,
  category: categoryReducers,
  products: productsReducers,
});
export default rootReducer;
