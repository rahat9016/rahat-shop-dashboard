import React, { useRef } from "react";
import Laptop from "../../images/laptop.png";
import { BsCloudArrowUpFill } from "react-icons/bs";
const CategoryEditModal = (props) => {
  const fileRef = useRef(null);
  //   console.log(props.editItem);
  const { editItem, categories } = props;
  // console.log(editItem);
  return (
    <div>
      <div
        className={`${
          props.editModal
            ? "block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10	w-[50%] bg-white rounded-2 shadow-md"
            : "hidden"
        }`}
      >
        <div className="flex justify-between bg-slate-50 px-2 py-1 border-b-2">
          <h1>Do you want to Edit category?</h1>
          <span
            onClick={() => {
              props.setEditModal(false);
            }}
            className="cursor-pointer text-[#646464] font-bold hover:text-black"
          >
            X
          </span>
        </div>
        <div className="p-2">
          <form
            className="rounded-2xl shadow-sm p-5 gap-2"
            onSubmit={props.handleUpdateCategory}
          >
            <div className="my-2 gap-2 grid grid-cols-2">
              <div>
                <p>Category Name</p>
                <input
                  type="text"
                  placeholder="Update category name"
                  className="w-full border outline-none p-2"
                  name="title"
                  onChange={props.handleEditChange}
                  value={editItem.title}
                />
              </div>
              <div>
                <p>Select Category</p>
                <select
                  className="w-full border p-2 outline-none"
                  name="parentId"
                  onChange={props.handleEditChange}
                  value={editItem.parentId}
                >
                  <option>Select category</option>
                  {categories.length > 0
                    ? categories.map((c) => {
                        // console.log(c.value);
                        return (
                          <option key={c.id} value={c.id}>
                            {c.title}
                          </option>
                        );
                      })
                    : null}
                </select>
                {/* <Select
                  name="parentId"
                  value={editItem.parentId?._id}
                  optionValue="Select Category"
                  onChange={props.handleEditChange}
                  categories={categories}
                /> */}
              </div>
              <div className="relative mt-2">
                <img src={Laptop} alt="Laptop" className="w-20 border p-1" />
                <span className=" absolute top-[-10px] left-[75px] font-bold text-gray-500">
                  X
                </span>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-center border-2 border-dashed mb-2">
                <input
                  ref={fileRef}
                  hidden
                  type="file"
                  onChange={props.handleEditChange}
                  multiple={props.multiple}
                  accept="image/png"
                />
                <BsCloudArrowUpFill
                  onClick={() => fileRef.current.click()}
                  className="text-5xl text-primary"
                />
                <p>Browse File to Upload</p>
                <p>Only PNG supported</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-primary py-2 px-8 text-white rounded-md shadow-sm"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryEditModal;
