import React from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlineEdit, AiFillEye } from "react-icons/ai";
import "./style.css";
const RenderProduct = (props) => {
  const { productPictures, name, price, brand, quantity, _id } = props.product;
  return (
    <div className="render-product boxShadow-1" onClick={props.modal}>
      <p>{props.index}</p>
      <img src={productPictures[0]?.img} alt="" />
      <p>{name}</p>
      <p>{quantity}</p>
      <p>{brand.name}</p>
      <p>${price}</p>
      <p>
        <AiFillEye
          className="product-view"
          onClick={() => props.handleShowModalView(_id)}
        />
      </p>
      <p>
        <AiOutlineEdit
          className="product-edit"
          onClick={() => props.handleEditProduct(_id)}
        />
      </p>
      <p>
        <MdDelete
          className="product-delete"
          onClick={() => props.modalViewHandler(_id)}
        />
      </p>
    </div>
  );
};

export default RenderProduct;
