import { combineReducers } from "redux";
import { authReducers } from "./auth.reducers";
import { brandReducers } from "./brand.reducers";
import { categoryReducers } from "./category.reducers";
import { couponReducers } from "./coupon.reducers";
import { productsReducers } from "./product.reducers";

const rootReducer = combineReducers({
  auth: authReducers,
  category: categoryReducers,
  products: productsReducers,
  brands: brandReducers,
  coupon: couponReducers,
});
export default rootReducer;
