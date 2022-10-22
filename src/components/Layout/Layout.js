import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";
import { SidebarDashboardData } from "../../Data/Data";
import Logo from "../../images/logo.png";
import Aside from "../Aside/Aside";

const Layout = (props) => {
  const navigate = useNavigate();
  return (
    <>
      {props.sidebar ? (
        <div className="row">
          {/* Sidebar Menu */}
          <div className="sidebar-menu">
            <div className="logo-box">
              <img
                src={Logo}
                alt="Logo"
                onClick={() => navigate("/", { replace: true })}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="menu">
              {SidebarDashboardData &&
                SidebarDashboardData.map((data, index) => {
                  return (
                    <NavLink
                      key={index}
                      to={data.location ? data.location : "#"}
                      className={"menuItem"}
                    >
                      <data.icon />
                      <span>{data.heading}</span>
                    </NavLink>
                  );
                })}
            </div>
          </div>
          {/* Mid Content */}
          <main className="main-section">{props.children}</main>
          <Aside />
        </div>
      ) : (
        props.children
      )}
    </>
  );
};

export default Layout;
