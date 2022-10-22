import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/Button/Button";
import {
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../action/category.action";
import { renderCategory } from "../../helpers/Categories";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Image from "../../components/Image/Image";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  AiFillCheckSquare,
  AiFillFolderOpen,
  AiFillFolder,
  AiFillFile,
} from "react-icons/ai";
import { ImCheckboxUnchecked } from "react-icons/im";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { GrFormClose } from "react-icons/gr";
import "./style.css";
const Category = () => {
  const { category } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [categoryImg, setCategoryImg] = useState("");
  const [parentId, setParentId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);

  function handleCategorySubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("title", categoryName);
    form.append("parentId", parentId);
    form.append("categoryImage", categoryImg);
    dispatch(addCategory(form)).then(() => {
      dispatch(getCategory());
      setCategoryName("");
      setParentId("");
      setCategoryImg("");
    });
  }
  // Handle Image
  const onHandleFile = (e) => {
    setCategoryImg(e.target.files[0]);
  };

  //Render All Category
  const categories = renderCategory(category.categories);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        value: category._id,
        label: category.title,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };
  // const showUpdateModal
  const createCategory = () => {
    return (
      <form
        className="category-form"
        onSubmit={handleCategorySubmit}
        method="post"
      >
        <div className="category-create">
          <p>Category Name</p>
          <Input
            class="boxShadow-1"
            type="text"
            required
            placeholder="Category Name"
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <p>Category Type</p>
          <Select
            onChange={(e) => setParentId(e.target.value)}
            categories={categories}
            optionValue="Select Category"
          />
        </div>
        <Image onHandleFile={onHandleFile} style={{ marginTop: "20px" }} />
        {category.message ? (
          <p className="successful-msg">{category.message}</p>
        ) : (
          ""
        )}
        <Button
          style={{
            background: "#f799a3",
            color: "#fff",
            borderRadius: "5px",
          }}
          btnClass="categoryBtn"
          type="submit"
        >
          Create
        </Button>
      </form>
    );
  };
  // Update Category
  const updateEditCategory = () => {
    setShowUpdateModal(true);
    updateCheckedAndExpanded();
  };
  const updateCheckedAndExpanded = () => {
    const checkedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => category.value === categoryId
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => category.value === categoryId
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  //Handle Category Input
  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updateCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updateCheckedArray);
      console.log({ updateCheckedArray });
    } else if (type === "expanded") {
      const updateExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updateExpandedArray);
    }
  };
  // Update Form
  const handleUpdateCategoryForm = (e) => {
    e.preventDefault();
    const form = new FormData();
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("title", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
    });
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("title", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
    });
    dispatch(updateCategory(form)).then(() => {
      dispatch(getCategory());
      setShowUpdateModal(false);
    });
  };

  // Delete Category
  const deleteCategoryAction = () => {
    setShowDeleteModal(true);
    updateCheckedAndExpanded();
  };
  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    dispatch(deleteCategory(checkedIdsArray)).then(() => {
      dispatch(getCategory());
      setShowDeleteModal(false);
    });
  };
  //Return
  return (
    <div className="container">
      <div className="wrapper">
        <Layout sidebar>
          <div className={showUpdateModal ? "showModal" : "noShowModal"}>
            <form
              className="category-update-form"
              onSubmit={handleUpdateCategoryForm}
            >
              <GrFormClose
                className="closeIcon"
                onClick={() => setShowUpdateModal(false)}
              />
              <div className="category-update">
                <div className="category-update-header">
                  <h3>Category Name</h3>
                  <h3>Select category</h3>
                </div>
                {expandedArray.length > 0 &&
                  expandedArray.map((item, index) => (
                    <div className="update-element" key={index}>
                      <Input
                        type="text"
                        required
                        value={item.name}
                        placeholder="Category Name"
                        onChange={(e) =>
                          handleCategoryInput(
                            "name",
                            e.target.value,
                            index,
                            "expanded"
                          )
                        }
                      />
                      <select
                        className="update-select"
                        value={item.parentId}
                        onChange={(e) =>
                          handleCategoryInput(
                            "parentId",
                            e.target.value,
                            index,
                            "expanded"
                          )
                        }
                      >
                        <option value={""}>Select Category</option>
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                {checkedArray.length > 0 &&
                  checkedArray.map((item, index) => (
                    <div className="update-element" key={index}>
                      <Input
                        type="text"
                        required
                        value={item.name}
                        placeholder="Category Name"
                        onChange={(e) =>
                          handleCategoryInput(
                            "name",
                            e.target.value,
                            index,
                            "checked"
                          )
                        }
                      />
                      <select
                        className="update-select"
                        value={item.parentId}
                        onChange={(e) =>
                          handleCategoryInput(
                            "parentId",
                            e.target.value,
                            index,
                            "checked"
                          )
                        }
                      >
                        <option value={""}>Select Category</option>
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
              </div>

              <Button
                style={{
                  background: "#f799a3",
                  color: "#fff",
                  borderRadius: "5px",
                  margin: "20px 20px",
                }}
                btnClass="categoryBtn"
                type="submit"
              >
                Update
              </Button>
            </form>
          </div>
          <div
            className={
              showDeleteModal ? "showDeleteModal" : "noShowDeleteModal"
            }
          >
            <div className="delete-header-box">
              <h4>Confirm Category delete?</h4>
            </div>
            <div style={{ padding: "5px" }}>aaa</div>
            <div className="delete-category-box">
              <Button
                style={{
                  background: "#4E68FE",
                  borderRadius: "2px",
                  padding: "7px 20px",
                  color: "#EFEFEF",
                }}
                onClick={() => {
                  setShowDeleteModal(false);
                }}
              >
                No
              </Button>
              <Button
                style={{
                  background: "#E12411",
                  borderRadius: "2px",
                  padding: "7px 20px",
                  color: "#EFEFEF",
                }}
                onClick={deleteCategories}
              >
                Yes
              </Button>
            </div>
          </div>
          <div
            className={
              showUpdateModal
                ? "category-section noOpacity"
                : " category-section opacity"
            }
          >
            {/* Category Create Section */}
            <div className="category-create-section">
              <section className="all-categories-section">
                <h2>All Categories</h2>
                <div className="categories-wrapper">
                  <CheckboxTree
                    nodes={renderCategories(category.categories)}
                    checked={checked}
                    expanded={expanded}
                    onCheck={(checked) => setChecked(checked)}
                    onExpand={(expanded) => setExpanded(expanded)}
                    icons={{
                      check: (
                        <AiFillCheckSquare style={{ color: "var(--pink)" }} />
                      ),
                      uncheck: (
                        <ImCheckboxUnchecked style={{ color: "var(--pink)" }} />
                      ),

                      halfCheck: (
                        <ImCheckboxUnchecked style={{ color: "var(--pink)" }} />
                      ),
                      expandClose: (
                        <IoIosArrowForward style={{ color: "var(--pink)" }} />
                      ),
                      expandOpen: (
                        <MdSubdirectoryArrowRight
                          style={{ color: "var(--pink)" }}
                        />
                      ),
                      parentOpen: (
                        <AiFillFolderOpen style={{ color: "var(--pink)" }} />
                      ),
                      parentClose: (
                        <AiFillFolder style={{ color: "var(--pink)" }} />
                      ),
                      leaf: <AiFillFile style={{ color: "var(--pink)" }} />,
                    }}
                  />
                </div>
                <div>
                  <Button
                    style={{
                      background: "var(--pink)",
                      color: "#fff",
                      borderRadius: "0px",
                      margin: "10px",
                    }}
                    onClick={deleteCategoryAction}
                  >
                    Delete
                  </Button>
                  <Button
                    style={{
                      background: "var(--pink)",
                      color: "#fff",
                      borderRadius: "0px",
                      margin: "10px",
                    }}
                    onClick={updateEditCategory}
                  >
                    Edit
                  </Button>
                </div>
              </section>
              <section>
                <h2>Create Category</h2>
                {createCategory()}
              </section>
            </div>
            {/* All Category */}
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default Category;
