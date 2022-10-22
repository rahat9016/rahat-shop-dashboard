import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  getProducts,
  updateProduct,
} from "../../../action/product.action";
import Layout from "../../../components/Layout/Layout";
import ProductForm from "../../../components/ProductForm/ProductForm";
import { api } from "../../../urlConfig";
const initialState = {
  name: "",
  _id: "",
  brand: "",
  description: "",
  price: 0,
  quantity: 0,
  shipping: ["Yes", "No"],
  categoryId: {
    _id: "",
    title: "",
  },
  color: "",
};
const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const [productPictures, setProductPictures] = useState([]);
  useEffect(() => {
    dispatch(getProductById(id));
    axios.get(`${api}/product/${id}`).then((res) => {
      setValues({ ...values, ...res.data.product });
    });
  }, []);
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
    dispatch(updateProduct(id, form)).then(() => {
      dispatch(getProducts());
      navigate("/all-products");
    });
  };
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onHandleFile = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };
  return (
    <div className="container">
      <div className="wrapper">
        <Layout sidebar>
          <ProductForm
            values={values}
            setValues={setValues}
            handleProductSubmit={handleProductSubmit}
            onHandleFile={onHandleFile}
            productPictures={productPictures}
            handleChange={handleChange}
            method="PUT"
            buttonData="Update Product"
          />
        </Layout>
      </div>
    </div>
  );
};

export default UpdateProduct;
