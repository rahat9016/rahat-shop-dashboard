import React from "react";

const BrandDeleteModal = (props) => {
  return (
    <div
      className={`${
        props.deleteModal
          ? "block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10	w-[40%] bg-white rounded-2 shadow-md"
          : "hidden"
      }`}
    >
      <div className="flex justify-between bg-slate-50 px-2 py-1 border-b-2">
        <h1>Do you want to delete Brand?</h1>
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
            src={props.deleteItem && props.deleteItem.brandLogo?.url}
            alt=""
            className="w-16"
          />
          <div>
            <h2> Brand name:- {props.deleteItem.name} </h2>
            <h2>Brand Description:- {props.deleteItem?.description}</h2>
          </div>
        </div>

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
            onClick={() => props.handleDeleteButton(props.deleteItem._id)}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandDeleteModal;
