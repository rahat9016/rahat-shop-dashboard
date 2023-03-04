import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillFileEarmarkImageFill } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Image from "../../components/Image/Image";
import Input from "../../components/Input/Input";
import Layout from "../../components/Layout/Layout";
import Select from "../../components/Select/Select";
import { renderCategory } from "../../helpers/Categories";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../Redux/action/category.action";
import CategoryDeleteModal from "../../components/Modal/CategoryDeleteModal";
import CategoryEditModal from "../../components/Modal/CategoryEditModal";

const categoryObj = {
  id: "",
  title: "",
  parentId: "",
  categoryImg: {
    url: "",
    id: "",
  },
  categoryImgFile: {},
};

const Category = () => {
  const [values, setValues] = useState(categoryObj);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [editItem, setEditItem] = useState(categoryObj);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  // Render Categories by Recursion function
  const categories = renderCategory(category.categories);

  // Category create handler
  const handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("title", values.title);
    form.append("parentId", values.parentId);
    form.append("categoryImg", values.categoryImg);
    if (values.title !== "") {
      dispatch(addCategory(form));
    }
    values.title = "";
    values.parentId = "";
    values.categoryImg = "";
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    setValues({ ...values, categoryImg: e.target.files[0] });
  };
  const handleDeleteViewButton = (category) => {
    setDeleteItem(category);
    setDeleteModal(true);
  };
  const handleDeleteButton = (id) => {
    dispatch(deleteCategory(id));
    setDeleteModal(false);
    setDeleteItem({});
  };
  const handleEditViewButton = (category) => {
    // console.log(category);
    setEditModal(true);
    setEditItem({ ...editItem, ...category, parentId: category.parentId?._id });
  };
  const handleUpdateCategory = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("id", editItem.id);
    form.append("title", editItem.title);
    form.append("categoryImgFile", editItem.categoryImgFile);
    form.append("categoryImg", editItem.categoryImg);
    if (editItem.parentId !== undefined) {
      form.append("parentId", editItem.parentId);
    }
    dispatch(updateCategory(form, editItem.id));
    setEditModal(false);
  };
  const handleEditChange = (e) => {
    e.preventDefault();
    let file = e.target.files && e.target.files[0];
    setEditItem({
      ...editItem,
      [e.target.name]: e.target.value,
      categoryImgFile: file,
    });
  };
  return (
    <Layout>
      <div>
        {/* create part  */}
        <form
          className="rounded-2xl shadow-sm p-5 gap-2"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <div>
              {" "}
              <p>Category Name</p>
              <Input
                placeholder="Category Name"
                type="text"
                required={"required"}
                value={values.title}
                onChange={handleChange}
                name="title"
              />
            </div>
            <div>
              <p>Select Category </p>
              <Select
                categories={categories}
                optionValue="Select Category"
                onChange={handleChange}
                name="parentId"
                value={values.parentId}
              ></Select>
            </div>
          </div>
          <div className="mt-2">
            <Image onHandleFile={handleImage} />
          </div>
          <button className="bg-primary py-2 px-8 text-white rounded-md shadow-sm">
            Create
          </button>
        </form>
        {/* view part  */}
        <div className="p-5">
          <div className="bg-white p-4 rounded-xl shadow-inner relative">
            {/* Delete Modal view */}
            <CategoryDeleteModal
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              deleteItem={deleteItem}
              setDeleteItem={setDeleteItem}
              handleDeleteButton={handleDeleteButton}
            />

            {/* Edit Modal view */}
            <CategoryEditModal
              editModal={editModal}
              setEditModal={setEditModal}
              handleEditChange={handleEditChange}
              categories={categories}
              editItem={editItem}
              handleUpdateCategory={handleUpdateCategory}
            />
            {/* Show all categories */}
            <ul className="flex items-center bg-slate-50 p-2 rounded-md">
              <li className="basis-2/12">Image</li>
              <li className="basis-4/12">Name</li>
              <li className="basis-3/12">Parent ID</li>
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
                  placeholder="Search category..."
                />
                <BiSearch className="text-xl" />
              </li>
            </ul>
            <ul className="w-full h-40 overflow-y-scroll relative">
              {categories && categories.length > 0
                ? categories.map((category, index) => {
                    // console.log(category);
                    return (
                      <div
                        key={index}
                        className="flex items-center p-2 border border-b-sky-100 h-14 py-2"
                      >
                        <li className="basis-2/12">
                          {category.categoryImg !== undefined ? (
                            <img
                              src={
                                category.categoryImg !== undefined
                                  ? category.categoryImg.url
                                  : ""
                              }
                              alt=""
                              className="w-12"
                            />
                          ) : (
                            <BsFillFileEarmarkImageFill className="text-primary text-4xl " />
                          )}
                        </li>
                        <li className="basis-4/12">{category.title}</li>
                        <li className="basis-3/12">
                          {category.parentId !== undefined
                            ? category.parentId.title
                            : "No Parent ID"}
                        </li>
                        <li className="basis-2/12">
                          <ul className="flex gap-1 items-center">
                            <li
                              className="w-6 h-6 bg-green-100	flex justify-center items-center rounded-md p-1 cursor-pointer"
                              onClick={() => handleEditViewButton(category)}
                            >
                              <AiFillEdit className="text-xl text-green-600" />
                            </li>

                            <li
                              className="w-6 h-6 bg-rose-100 flex justify-center items-center rounded-md cursor-pointer"
                              onClick={() => handleDeleteViewButton(category)}
                            >
                              {" "}
                              <MdOutlineDelete className="text-xl text-rose-600	" />
                            </li>
                          </ul>
                        </li>
                        <li className="basis-3/12">
                          {category.parentId !== undefined
                            ? "Children"
                            : "Parent"}
                        </li>
                      </div>
                    );
                  })
                : null}
            </ul>
          </div>
          <div></div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
