import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import {
  deleteProduct,
  // filterProducts,
  getProductForPagination,
} from "../../../action/product.action";
import Layout from "../../../components/Layout/Layout";
import ProductDeleteModal from "../../../components/Modal/ProductDeleteModal";
import ProductViewModal from "../../../components/Modal/ProductViewModal";
import Search from "../../../components/Search/Search";
import RenderProduct from "../RenderProduct.js/RenderProduct";
// import "antd/dist/antd.min.css";
import "./style.css";
const AllProducts = () => {
  const allProducts = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProductDeleteModal, setShowProductDeleteModal] = useState(false);
  const [showProductViewModal, setShowProductViewModal] = useState(false);
  const [productItem, setProductItem] = useState([]);

  useEffect(() => {
    dispatch(getProductForPagination(search, page, perPage));
  }, [dispatch, page, search, perPage]);

  useEffect(() => {
    setProductsCount(allProducts.totalProducts);
    setProducts(allProducts.paginationProduct);
  }, [allProducts.totalProducts, allProducts.paginationProduct]);
  console.log(allProducts);
  // Find Product By id form all products function
  const findProductById = (id) => {
    const product = products.find((pro) => pro._id === id);
    return product;
  };

  // Delete Product Show Modal
  const deleteModalViewHandler = (id) => {
    setShowProductViewModal(false);
    setProductItem([]);
    if (id) {
      setShowProductDeleteModal(true);
      const product = findProductById(id);
      setProductItem(product);
    }
  };
  //Delete Product
  const handleProductForDelete = (id) => {
    dispatch(deleteProduct(id)).then(() => {
      setShowProductDeleteModal(false);
      dispatch(getProductForPagination("createdAt", "desc", page));
    });
  };
  // Show Product View Modal
  const handleShowModalView = (id) => {
    setShowProductDeleteModal(false);
    setProductItem([]);
    if (id) {
      setShowProductViewModal(true);
      const product = findProductById(id);
      setProductItem(product);
    }
  };
  const handleEditProduct = (id) => {
    if (id) {
      navigate(`/product/update/${id}`, {
        state: { id: 7, color: "green" },
      });
    }
  };
  const handleSearchProduct = () => {
    // dispatch(filterProducts({ query: search }));
  };

  return (
    <div className="container">
      <div className="wrapper">
        <Layout sidebar>
          <div className="all-products-section">
            <div className="get-product-header">
              <h3 className="product-header">All Products</h3>
              <Search
                placeholder="Products"
                style={{ height: "50px", width: "40%" }}
                handleSearchProduct={handleSearchProduct}
                setSearch={setSearch}
              />
            </div>

            <ProductDeleteModal
              showProductDeleteModal={showProductDeleteModal}
              productItem={productItem}
              setShowProductDeleteModal={setShowProductDeleteModal}
              handleProductForDelete={handleProductForDelete}
            />

            <ProductViewModal
              showProductViewModal={showProductViewModal}
              productItem={productItem}
              setShowProductViewModal={setShowProductViewModal}
              setProductItem={setProductItem}
            />

            <div className="product-heading">
              <h3>#</h3>
              <h3>Image</h3>
              <h3>Name</h3>
              <h3>Quantity</h3>
              <h3>Brand</h3>
              <h3>Price</h3>
              <h3>View</h3>
              <h3>Edit</h3>
              <h3>Delete</h3>
            </div>
            <div>
              {
                <h4 className="not-found-404">
                  {products.length > 0 ? "" : "Product Not Found 404"}
                </h4>
              }
              {products.map((product, index) => (
                <RenderProduct
                  index={index + 1}
                  product={product}
                  key={index + 1}
                  modalViewHandler={deleteModalViewHandler}
                  setShowProductModal={setShowProductDeleteModal}
                  handleShowModalView={handleShowModalView}
                  handleEditProduct={handleEditProduct}
                />
              ))}
              <Pagination
                current={page}
                total={Math.round((productsCount / perPage) * 10)}
                onChange={(value) => setPage(value)}
              />
            </div>
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default AllProducts;
