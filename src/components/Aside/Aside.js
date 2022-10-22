import React from "react";
import HI1 from "../../images/pic-1.png";
import HI2 from "../../images/pic-2.png";
import "./style.css";
const Aside = () => {
  return (
    <aside>
      <h3 className="updates-header">Updates</h3>
      <div className="customer-orders-section">
        <div className="customer-orders-box">
          <img src={HI1} alt="Customer" className="customer-profile-pic" />
          <div>
            <h4>Minhajur Rohoman</h4> has ordered <span>Apple Watch</span>
            <p>{Math.round(Date.now())}</p>
          </div>
        </div>
        <div className="customer-orders-box">
          <img src={HI2} alt="Customer" className="customer-profile-pic" />
          <div>
            <h4>Jerry</h4> has ordered <span>Samsung laptop</span>
            <p>{Math.round(Date.now())}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
