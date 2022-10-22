import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, getProducts } from "../../action/product.action";
import Layout from "../../components/Layout/Layout";
import ProductForm from "../../components/ProductForm/ProductForm";
// import AllProducts from "./AllProducts/AllProducts";
import "./style.css";
const initialState = {
  name: "",
  price: 0,
  quantity: 0,
  color: "",
  description: "",
  categoryId: "",
  shipping: "",
};
const Product = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialState);
  const [productPictures, setProductPictures] = useState([]);

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", values.name);
    form.append("price", values.price);
    form.append("description", values.description);
    form.append("quantity", values.quantity);
    form.append("categoryId", values.categoryId);
    form.append("brand", values.brand);
    form.append("shipping", values.shipping);
    form.append("color", values.color);
    for (let pic of productPictures) {
      form.append("productPictures", pic);
    }
    dispatch(addProduct(form)).then(() => {
      dispatch(getProducts());
    });
  };
  const onHandleFile = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="wrapper">
        <Layout sidebar>
          <h3 className="product-header">Create Product</h3>
          <div className="product-section">
            <ProductForm
              values={values}
              setValues={setValues}
              handleProductSubmit={handleProductSubmit}
              onHandleFile={onHandleFile}
              productPictures={productPictures}
              handleChange={handleChange}
              method="POST"
              buttonData="Create"
            />
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default Product;
