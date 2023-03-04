import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Signing from "./pages/Auth/Signing";
import Signup from "./pages/Auth/Signup";
import Brand from "./pages/Brand/Brand";
import Category from "./pages/Category/Category";
import Coupon from "./pages/Coupon/Coupon";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Orders from "./pages/Orders/Orders";
import PrivateRouter from "./pages/PrivateRoute/PrivateRoute";
import AllProducts from "./pages/Product/AllProducts/AllProducts";
import Product from "./pages/Product/Product";
import UpdateProduct from "./pages/Product/UpdateProduct/UpdateProduct";
import { isUserLoggedIn } from "./Redux/action/auth.action";
import { getBrands } from "./Redux/action/brand.action";
import { getCategory } from "./Redux/action/category.action";
import { getCoupon } from "./Redux/action/coupon.action";
import { getProductCount, getProducts } from "./Redux/action/product.action";

function App() {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCategory());
      dispatch(getProducts());
      dispatch(getProductCount());
      dispatch(getBrands());
      dispatch(getCoupon());
    }
  }, [auth.authenticate, dispatch]);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [dispatch, auth.authenticate]);

  return (
    <div className="w-full h-screen bg flex justify-center items-center">
      <Routes>
        <Route path="/*" element={<NotFound />}></Route>
        <Route
          path="/"
          element={
            <PrivateRouter>
              <Home />
            </PrivateRouter>
          }
        ></Route>
        <Route
          path="/category"
          element={
            <PrivateRouter>
              <Category />
            </PrivateRouter>
          }
        ></Route>
        <Route
          path="/brand"
          element={
            <PrivateRouter>
              <Brand />
            </PrivateRouter>
          }
        ></Route>

        <Route
          path="/product/update/:id"
          element={
            <PrivateRouter>
              <UpdateProduct />
            </PrivateRouter>
          }
        ></Route>

        <Route
          path="/product"
          element={
            <PrivateRouter>
              <Product />
            </PrivateRouter>
          }
        ></Route>
        <Route
          path="/coupon"
          element={
            <PrivateRouter>
              <Coupon />
            </PrivateRouter>
          }
        ></Route>
        <Route
          path="/products"
          element={
            <PrivateRouter>
              <AllProducts />
            </PrivateRouter>
          }
        ></Route>
        <Route
          path="/orders"
          element={
            <PrivateRouter>
              <Orders />
            </PrivateRouter>
          }
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signing" element={<Signing />}></Route>
      </Routes>
    </div>
  );
}

export default App;
