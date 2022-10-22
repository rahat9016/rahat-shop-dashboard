import React from "react";
import Button from "../Button/Button";

const ProductDeleteModal = (props) => {
  const { _id, name } = props.productItem;
  return (
    <div
      className={
        props.showProductDeleteModal
          ? "showProductDeleteModal"
          : "noProductShowDeleteModal"
      }
    >
      <div className="delete-product-header-box">
        <h4>Confirm Product delete?</h4>
      </div>
      <div style={{ padding: "5px" }}>
        <h3>Product Name - {name}</h3>
      </div>
      <div className="delete-product-box ">
        <Button
          style={{
            background: "#4E68FE",
            borderRadius: "2px",
            padding: "7px 20px",
            color: "#EFEFEF",
          }}
          onClick={() => {
            props.setShowProductDeleteModal(false);
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
          onClick={() => props.handleProductForDelete(_id)}
        >
          Yes
        </Button>
      </div>
    </div>
  );
};

export default ProductDeleteModal;
