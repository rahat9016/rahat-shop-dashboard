import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import Image from "../../components/Image/Image";
import Input from "../../components/Input/Input";
import Layout from "../../components/Layout/Layout";
import "./style.css";
import { createBrand, deleteBrand } from "../../Redux/action/brand.action";
import { MdOutlineDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { BsFillFileEarmarkImageFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import BrandDeleteModal from "../../components/Modal/BrandDeleteModal";
const initialState = {
  name: "",
  description: "",
  logo: {},
};
const Brand = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brands);
  const [values, setValues] = useState(initialState);
  // const [brandCover, setBrandCover] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const handleProductSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", values.name);
    form.append("description", values.description);
    form.append("brandLogo", values.logo);
    // for (let pic of brandCover) {
    //   form.append("brandCover", pic);
    // }
    if (values.name !== "") {
      dispatch(createBrand(form));
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLogoFile = (e) => {
    const file = e.target.files[0];
    setValues({ ...values, logo: file });
  };
  // const handleCoverFile = (e) => {
  //   const files = e.target.files[0];
  //   setBrandCover([...brandCover, files]);
  // };
  const handleDeleteViewButton = (brand) => {
    setDeleteItem(brand);
    setDeleteModal(true);
  };
  const handleDeleteButton = (id) => {
    dispatch(deleteBrand(id));
    setDeleteModal(false);
    setDeleteItem({});
  };
  return (
    <Layout>
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
                onHandleFile={handleLogoFile}
                // imageHandler={brandLogo}
              />
            </div>
            {/* <div>
              <p className="input-header">Brand Cover's </p>
              <Image onHandleFile={handleCoverFile} multiple={"multiple"} />
            </div> */}
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
        <div className="bg-white p-4 rounded-xl shadow-inner relative">
          <BrandDeleteModal
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            deleteItem={deleteItem}
            setDeleteItem={setDeleteItem}
            handleDeleteButton={handleDeleteButton}
          />

          {/* Edit Modal view */}
          {/* <CategoryEditModal
            editModal={editModal}
            setEditModal={setEditModal}
            handleEditChange={handleEditChange}
            categories={categories}
            editItem={editItem}
            handleUpdateCategory={handleUpdateCategory}
          /> */}
          <ul className="flex items-center bg-slate-50 p-2 rounded-md">
            <li className="basis-2/12">Brand Logo</li>
            <li className="basis-2/12">Brand Cover</li>
            <li className="basis-4/12">Name</li>
            <li className="basis-4/12">Description</li>
            <li className="basis-2/12">
              <ul className="flex gap-1">
                <li>Edit</li>
                <span>/</span>
                <li>Delete</li>
              </ul>
            </li>
            <li className="basis-3/12 h-10 rounded-xl shadow-sm p-2 bg-white flex items-center">
              <input
                type="text"
                className="outline-none w-full h-full py-2"
                placeholder="Search Brand..."
              />
              <BiSearch className="text-xl" />
            </li>
          </ul>
          <ul className="w-full h-40 overflow-y-scroll relative">
            {brands && brands.length > 0
              ? brands.map((brand, index) => {
                  // console.log(brand);
                  return (
                    <div
                      key={index}
                      className="flex items-center p-2 border border-b-sky-100 h-20 py-2"
                    >
                      <li className="basis-2/12">
                        {brand.brandLogo !== undefined ? (
                          <img
                            src={
                              brand.brandLogo !== undefined
                                ? brand.brandLogo.url
                                : ""
                            }
                            alt=""
                            className="w-12"
                          />
                        ) : (
                          <BsFillFileEarmarkImageFill className="text-primary text-4xl " />
                        )}
                      </li>
                      <li className="basis-2/12">
                        {brand.brandLogo !== undefined ? (
                          <img
                            src={
                              brand.brandLogo !== undefined
                                ? brand.brandLogo.url
                                : ""
                            }
                            alt=""
                            className="w-12"
                          />
                        ) : (
                          <BsFillFileEarmarkImageFill className="text-primary text-4xl " />
                        )}
                      </li>
                      <li className="basis-4/12">{brand.name}</li>
                      <li className="basis-4/12">
                        {brand.description.slice(0, 200)}
                      </li>
                      <li className="basis-2/12">
                        <ul className="flex gap-1 items-center">
                          <li className="w-6 h-6 bg-green-100	flex justify-center items-center rounded-md p-1 cursor-pointer">
                            <AiFillEdit className="text-xl text-green-600" />
                          </li>

                          <li
                            className="w-6 h-6 bg-rose-100 flex justify-center items-center rounded-md cursor-pointer"
                            onClick={() => handleDeleteViewButton(brand)}
                          >
                            {" "}
                            <MdOutlineDelete className="text-xl text-rose-600	" />
                          </li>
                        </ul>
                      </li>
                      <li className="basis-3/12 h-10 rounded-xl shadow-sm p-2 bg-white flex items-center"></li>
                    </div>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Brand;
