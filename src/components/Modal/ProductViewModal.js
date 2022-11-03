import React from "react";
import { GrClose } from "react-icons/gr";
import "./style.css";
const ProductViewModal = (props) => {
  const {
    showProductViewModal,
    setProductItem,
    productItem,
    setShowProductViewModal,
  } = props;
  const {
    name,
    brand,
    productPictures,
    quantity,
    color,
    description,
    price,
    categoryId,
  } = productItem;
  return (
    <div
      className={
        showProductViewModal ? "showProductViewModal" : "noProductShowViewModal"
      }
    >
      {/* view product header  */}
      <div className="view-product-header">
        <h2>View product</h2>
        <GrClose
          onClick={() => {
            setShowProductViewModal(false);
            setProductItem([]);
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
      {/* View Product body */}
      <div className="view-product-body">
        <div className="view-product-img">
          <img src={productPictures && productPictures[0]?.img} alt="" />
          <div className="view-product-carousel">
            <div>
              <img src={productPictures && productPictures[1]?.img} alt="" />
            </div>
            <div>
              <img src={productPictures && productPictures[0]?.img} alt="" />
            </div>
            <div>
              <img src={productPictures && productPictures[1]?.img} alt="" />
            </div>
          </div>
        </div>
        <div>
          <h3>{name && name}</h3>
          <div>
            <p>Category - {categoryId && categoryId.title}</p>
            <p>Brand - {brand ? brand.name : ""}</p>
          </div>
          <div>
            <p>Quantity - {quantity && quantity}</p>
            <p style={{ display: "flex", alignItems: "center" }}>
              Color -{" "}
              <div
                style={{ backgroundColor: { color } }}
                className="color-circle "
              ></div>
            </p>
          </div>
          <div>
            <p>Price - {price && price}</p>
          </div>
          <div>
            <p>Product Details - {description && description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
