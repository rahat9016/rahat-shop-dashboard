import React from "react";
import { useSelector } from "react-redux";
import { renderCategory } from "../../helpers/Categories";
import Button from "../Button/Button";
import Image from "../Image/Image";
import Input from "../Input/Input";
import Select from "../Select/Select";

const ProductForm = ({
  values,
  handleProductSubmit,
  onHandleFile,
  productPictures,
  handleChange,
  method,
  buttonData,
}) => {
  const { category, brands } = useSelector((state) => ({
    ...state,
  }));
  const categories = renderCategory(category.categories);
  return (
    <form onSubmit={handleProductSubmit} method={method}>
      {/* Product name & Price */}
      <div className="product-input-box  ">
        <div>
          <p className="input-header">Product name</p>
          <Input
            class="boxShadow-1"
            type="text"
            name="name"
            value={values?.name}
            placeholder="Product Name"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="input-header">Price</p>
          <Input
            class="boxShadow-1"
            value={values?.price}
            type="number"
            placeholder="Product Price"
            name="price"
            required
            onChange={handleChange}
          />
        </div>
      </div>
      {/* Select Category & Quantity */}
      <div className="product-input-box">
        <div>
          <p className="input-header">Select category</p>
          <Select
            name="categoryId"
            class="boxShadow-1"
            value={values.categoryId}
            optionValue="Select Category"
            onChange={handleChange}
            categories={categories}
          />
        </div>
        <div>
          <p className="input-header">Quantity</p>
          <Input
            class="boxShadow-1"
            value={values?.quantity}
            type="number"
            name="quantity"
            placeholder="Product Quantity"
            required
            onChange={handleChange}
          />
        </div>
      </div>
      {/* Create Brand, Shipping & Color */}
      <div className="product-input-box">
        <div>
          <p className="input-header">Create Brand or Select Brand</p>
          <div className="flex boxShadow-1" style={{ background: "#fff" }}>
            <select
              value={values?.brand}
              name="brand"
              className="select"
              onChange={handleChange}
            >
              <option value={"Non Brand"}>Select Brand</option>
              {brands.brands.length > 0
                ? brands.brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))
                : null}
            </select>
          </div>
        </div>
        <div>
          <div
            className="flex alignItems "
            style={{ justifyContent: "space-between", gap: "10px" }}
          >
            <div style={{ width: "100%" }}>
              <p className="input-header">Shipping - Y/N</p>
              <div className="boxShadow-1 ">
                <select
                  required
                  name="shipping"
                  onChange={handleChange}
                  className="select"
                  value={values?.shipping}
                >
                  <option value={""}>Select Shipping</option>
                  <option value={"Yes"}>Yes</option>
                  <option value={"No"}>No</option>
                </select>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <p className="input-header">Product color</p>
              <div
                className="flex alignItems boxShadow-1 "
                style={{ background: "#fff" }}
              >
                <Input
                  name="color"
                  type="text"
                  value={values?.color}
                  placeholder="Product color #333FFF"
                  required
                  onChange={handleChange}
                />
                <Input
                  style={{
                    height: "40px",
                    padding: "0px",
                    border: "none",
                    width: "20%",
                  }}
                  name="color"
                  value={values?.color}
                  type="color"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Description & Image Upload */}
      <div className="product-input-box">
        <div>
          {" "}
          <p className="input-header">Product Description</p>
          <textarea
            onChange={handleChange}
            className="text-area"
            name="description"
            rows="10"
            cols="50"
            required
            placeholder="Product Description"
            maxLength="600"
            value={values?.description}
          ></textarea>
        </div>
        <div>
          <p className="input-header">Product Image</p>
          <Image
            onHandleFile={onHandleFile}
            imageHandler={productPictures}
            fromDatabaseProductPicture={values.productPictures}
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
          {buttonData && buttonData}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
