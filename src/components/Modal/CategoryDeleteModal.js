import React from "react";

const CategoryDeleteModal = (props) => {
  return (
    <>
      <div
        className={`${
          props.deleteModal
            ? "block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10	w-[40%] bg-white rounded-2 shadow-md"
            : "hidden"
        }`}
      >
        <div className="flex justify-between bg-slate-50 px-2 py-1 border-b-2">
          <h1>Do you want to delete category?</h1>
          <span
            onClick={() => {
              props.setDeleteModal(false);
            }}
            className="cursor-pointer text-[#646464] font-bold hover:text-black"
          >
            X
          </span>
        </div>
        <div className="p-2">
          <div className="flex items-center gap-2">
            <img
              src={props.deleteItem && props.deleteItem.categoryImg?.url}
              alt=""
              className="w-16"
            />
            <div>
              <h2> Category name:- {props.deleteItem.title} </h2>
              <h2>
                {" "}
                Parent name:-{" "}
                {props.deleteItem?.parentId?.title ||
                  "It hasn't parent id"}{" "}
              </h2>
            </div>
          </div>
          {props.deleteItem.children && (
            <p className="bg-rose-200 text-rose-500 text-center my-2">
              you can't delete the category because it's has children!
            </p>
          )}
          <div className="flex gap-1 justify-end mt-2">
            <button
              className="px-4 py-1  bg-red-200 text-red-500"
              onClick={() => {
                props.setDeleteModal(false);
                props.setDeleteItem({});
              }}
            >
              No
            </button>
            <button
              className="px-4 py-1  bg-green-200 text-green-500"
              disabled={props.deleteItem.children}
              onClick={() => props.handleDeleteButton(props.deleteItem.id)}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryDeleteModal;
