import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import "./style.css";
import { SidebarDashboardData } from "../../Data/Data";
import Logo from "../../images/logo.png";
import Aside from "../Aside/Aside";

const Layout = (props) => {
  const navigate = useNavigate();
  return (
    <div className="w-[92%] h-[90vh] mx-auto flex items-start glass p-10 rounded-3xl">
      {/* Sidebar Menu */}
      <div className="w-[12%] overflow-y-scroll h-full">
        <img
          src={Logo}
          alt="Logo"
          onClick={() => navigate("/", { replace: true })}
          className="w-20 mr-auto ml-auto"
        />
        <div className="flex flex-col mt-3 gap-3">
          {SidebarDashboardData &&
            SidebarDashboardData.map((data, index) => {
              return (
                <NavLink
                  key={index}
                  to={data.location ? data.location : "#"}
                  className={`flex items-center gap-2 font-bold text-[#333] h-10 ${
                    window.location.pathname === data.location
                      ? "bg-primaryLight before:w-2 before:h-full before:bg-primary"
                      : ""
                  }`}
                >
                  <data.icon />
                  <span>{data.heading}</span>
                </NavLink>
              );
            })}
        </div>
      </div>
      {/* Mid Content */}
      <main className="w-[88%] h-full overflow-y-scroll">{props.children}</main>
      <Aside />
    </div>
  );
};

export default Layout;
