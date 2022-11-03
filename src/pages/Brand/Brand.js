import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBrand } from "../../action/brand.action";
import Button from "../../components/Button/Button";
import Image from "../../components/Image/Image";
import Input from "../../components/Input/Input";
import Layout from "../../components/Layout/Layout";
import "./style.css";
const initialState = {
  name: "",
  description: "",
};
const Brand = () => {
  const dispatch = useDispatch();
  const [brandLogo, setBrandLogo] = useState([]);
  const [brandCover, setCoverBrand] = useState([]);
  const [values, setValues] = useState(initialState);
  const handleProductSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", values.name);
    form.append("description", values.description);
    for (let pic of brandLogo) {
      form.append("brandLogo", pic);
    }
    for (let pic of brandCover) {
      console.log(pic);
      form.append("brandCover", pic);
    }
    dispatch(createBrand(form));
  };
  // console.log(brandLogo);
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onLogoHandlerFile = (e) => {
    setBrandLogo([e.target.files[0]]);
  };
  const onCoverHandlerFiles = (e) => {
    setCoverBrand([...brandCover, e.target.files[0]]);
  };
  return (
    <div className="container">
      <div className="wrapper">
        <Layout sidebar>
          <div className="brand-container">
            <h1>Create Brand</h1>
            <form onSubmit={handleProductSubmit}>
              <div>
                <div>
                  <p className="input-header">Brand Name</p>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Brand Name"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  {" "}
                  <p className="input-header">Brand Description</p>
                  <textarea
                    className="text-area "
                    name="description"
                    rows="10"
                    cols="10"
                    required
                    placeholder="Brand Description"
                    maxLength="500"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="brand-images-box">
                <div>
                  <p className="input-header">Brand Logo </p>
                  <Image
                    onHandleFile={onLogoHandlerFile}
                    imageHandler={brandLogo}
                  />
                </div>
                <div>
                  <p className="input-header">Brand Cover's </p>
                  <Image
                    onHandleFile={onCoverHandlerFiles}
                    imageHandler={brandCover}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingBottom: "20px",
                }}
                className="boxShadow-1"
              >
                <Button
                  style={{
                    background: "#f799a3",
                    color: "#fff",
                    borderRadius: "5px",
                  }}
                  type="submit"
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default Brand;
