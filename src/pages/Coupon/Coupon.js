import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Layout from "../../components/Layout/Layout";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  createCoupon,
  deleteCoupon,
  getCoupon,
} from "../../action/coupon.action";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { AiFillDelete } from "react-icons/ai";
const Coupon = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const dispatch = useDispatch();
  const coupon = useSelector((state) => state.coupon);

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (name && expiry && discount) {
      dispatch(createCoupon(name, expiry, discount)).then(() => {
        dispatch(getCoupon());
      });
    }
  };
  const couponMessage = () => {
    if (coupon.message === "Already created!") {
      return (
        <p style={{ color: "red", marginTop: "10px" }}>{coupon.message}</p>
      );
    } else if (coupon.message === "coupon created!") {
      return (
        <p style={{ color: "green", marginTop: "10px" }}>{coupon.message}</p>
      );
    }
  };
  const deleteCouponFunc = (id) => {
    dispatch(deleteCoupon(id)).then(() => {
      dispatch(getCoupon());
    });
  };
  return (
    <div className="container">
      <div className="wrapper">
        <Layout sidebar>
          <div className="coupon-container">
            <div>
              <h1>Coupon</h1>
              <form onSubmit={handleCouponSubmit}>
                <div>
                  <div className="group">
                    <div>
                      <p className="input-header">Coupon Name</p>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Coupon Name"
                        onChange={(e) => setName(e.target.value)}
                        required={"required"}
                      />
                    </div>
                    <div>
                      <p className="input-header">Discount %</p>
                      <Input
                        name="discount"
                        type="number"
                        placeholder="Discount"
                        onChange={(e) => setDiscount(e.target.value)}
                        required={"required"}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="input-header">Expiry validity</p>
                    <DatePicker
                      selected={new Date()}
                      value={expiry}
                      required
                      onChange={(date) => setExpiry(date)}
                      className="input"
                      showTimeSelect
                    />
                  </div>
                </div>
                {couponMessage()}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingBottom: "20px",
                    marginTop: "20px",
                  }}
                  className="boxShadow-1"
                >
                  <Button
                    style={{
                      background: "#f799a3",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                    type="submit"
                  >
                    {coupon.loading ? "Loading" : "Create"}
                  </Button>
                </div>
              </form>
            </div>
            <div>
              <table className="table">
                <thead className="thead">
                  <tr className="theadrow">
                    <th>Name</th>
                    <th>Expiry</th>
                    <th>Discount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {coupon.coupon.map((couponItem, index) => {
                    return (
                      <tr
                        key={index}
                        style={{ textAlign: "center" }}
                        className="tbodyRow"
                      >
                        <td>{couponItem.name}</td>
                        <td>
                          {new Date(couponItem.expiry).toLocaleDateString()}
                        </td>
                        <td>{couponItem.discount}%</td>
                        <td>
                          <AiFillDelete
                            color="#FF4F4F"
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteCouponFunc(couponItem._id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default Coupon;
