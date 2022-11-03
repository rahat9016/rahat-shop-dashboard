import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import {
  getBrands,
  getCategory,
  getProductCount,
  getProducts,
  isUserLoggedIn,
} from "./action";
import Signing from "./pages/Auth/Signing";
import Signup from "./pages/Auth/Signup";
import Brand from "./pages/Brand/Brand";
import Category from "./pages/Category/Category";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import PrivateRouter from "./pages/PrivateRoute/PrivateRoute";
import AllProducts from "./pages/Product/AllProducts/AllProducts";
import Product from "./pages/Product/Product";
import UpdateProduct from "./pages/Product/UpdateProduct/UpdateProduct";

function App() {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCategory());
      dispatch(getProducts());
      dispatch(getProductCount());
      dispatch(getBrands());
    }
  }, [auth.authenticate, dispatch]);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [dispatch, auth.authenticate]);

  return (
    <div>
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
          path="/all-products"
          element={
            <PrivateRouter>
              <AllProducts />
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
