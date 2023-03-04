import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/Layout/Layout";
import Search from "../../../components/Search/Search";
import {
  deleteProduct,
  filterProducts,
} from "../../../Redux/action/product.action";
import Error from "../../../images/error.png";
import { MdOutlineDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import ProductDeleteModal from "../../../components/Modal/ProductDeleteModal";
const AllProducts = () => {
  const allProducts = useSelector((state) => state.products);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (search !== "") {
      setProducts(allProducts.filterProducts);
    } else {
      setProducts(allProducts.products);
    }
  }, [allProducts.filterProducts, allProducts.products, search, dispatch]);
  useEffect(() => {
    dispatch(filterProducts(search));
  }, [dispatch, search]);

  const handleDeleteViewButton = (product) => {
    setDeleteModal(true);
    setDeleteItem(product);
  };
  const handleDeleteButton = (id) => {
    dispatch(deleteProduct(id));
    setDeleteModal(false);
    setDeleteItem({});
  };
  return (
    <Layout sidebar>
      <div className="p-3">
        <div className="flex justify-between">
          <h3 className="font-bold text-4xl">All Products</h3>
          <Search
            placeholder="Products"
            style={{ height: "50px", width: "40%" }}
            setSearch={setSearch}
          />
        </div>

        <div className="p-5 relative">
          <ProductDeleteModal
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            deleteItem={deleteItem}
            setDeleteItem={setDeleteItem}
            handleDeleteButton={handleDeleteButton}
          />
          <div className="bg-white p-4 rounded-xl shadow-inner relative">
            <ul className="flex items-center bg-slate-50 p-2 rounded-md">
              <li className="basis-2/12">Image</li>
              <li className="basis-4/12">Name</li>
              <li className="basis-4/12">Description</li>
              <li className="basis-2/12 text-center">Price</li>
              <li className="basis-2/12">Color</li>
              <li className="basis-1/12">Sold</li>
              <li className="basis-2/12">
                <ul className="flex gap-1">
                  <li>Edit</li>
                  <span>/</span>
                  <li>Delete</li>
                </ul>
              </li>
            </ul>
            <ul className="w-full h-fit overflow-y-scroll relative">
              {products.length > 0 ? (
                products.map((product, index) => {
                  return (
                    <div
                      className="flex items-center p-2 border border-b-sky-100  py-2"
                      key={index}
                    >
                      <li className="basis-2/12">
                        <img
                          src={product.productPictures[0]?.url}
                          alt="Product img"
                          className="w-20"
                        />
                      </li>
                      <li className="basis-4/12">{product.name}</li>
                      <li className="basis-4/12">{product.description}</li>
                      <li className="basis-2/12 text-center">
                        ${product.price}
                      </li>
                      <li className="basis-2/12">
                        <div className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center">
                          <div
                            className="w-5 h-5 rounded-full shadow-sm"
                            style={{ background: `${product.color}` }}
                          ></div>
                        </div>
                      </li>
                      <li className="basis-1/12">{product.sold}</li>
                      <li className="basis-2/12">
                        <ul className="flex gap-1">
                          <li className="w-6 h-6 bg-green-100	flex justify-center items-center rounded-md p-1 cursor-pointer ">
                            <AiFillEdit className="text-xl text-green-600" />
                          </li>

                          <li
                            className="w-6 h-6 bg-rose-100 flex justify-center items-center rounded-md cursor-pointer"
                            onClick={() => handleDeleteViewButton(product)}
                          >
                            {" "}
                            <MdOutlineDelete className="text-xl text-rose-600	" />
                          </li>
                        </ul>
                      </li>
                    </div>
                  );
                })
              ) : (
                <div className="h-72 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <h1 className="font-bold text-2xl">Not Found products</h1>
                    <img src={Error} alt="Not found" className="w-40" />
                  </div>
                </div>
              )}
            </ul>
          </div>
          <div></div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;
