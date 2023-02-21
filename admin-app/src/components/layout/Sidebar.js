import React from "react";
import {
  RiDashboardFill,
  RiUser3Fill,
  RiHotelFill,
  RiRefundFill,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { BiTransferAlt } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Sidebar() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerLogout = (e) => {
    if (window.confirm("Are you sure you want to logout?")) {
      Cookies.remove("id_user");
      Cookies.remove("role");
      Cookies.remove("name_user");
      navigate("/", { replace: true });
      navigate(0);
    }
  };
  return (
    <div className="container text-black-50">
      <div>
        <span className="text-uppercase">Main</span>
        <div className="d-flex flex-column ps-2 py-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-dark fw-bold" : "text-black-50"
            }
          >
            <span className="text-info">
              <RiDashboardFill />
            </span>
            Dashboard
          </NavLink>
        </div>
      </div>
      <div>
        <span className="text-uppercase">List</span>
        <div className="d-flex flex-column ps-2 py-2">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? "text-dark fw-bold" : "text-black-50"
            }
          >
            <span className="text-info">
              <RiUser3Fill />
            </span>
            Users
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "text-dark fw-bold" : "text-black-50"
            }
          >
            <span className="text-info">
              <RiHotelFill />
            </span>
            Products
          </NavLink>
          <NavLink
            to="/chat-rooms"
            className={({ isActive }) =>
              isActive ? "text-dark fw-bold" : "text-black-50"
            }
          >
            <span className="text-info">
              <RiRefundFill />
            </span>
            Chat Rooms
          </NavLink>
        </div>
      </div>
      <div>
        <span className="text-uppercase">new</span>
        <div className="d-flex flex-column ps-2 py-2">
          <NavLink
            to="/add-product"
            className={({ isActive }) =>
              isActive ? "text-dark fw-bold" : "text-black-50"
            }
          >
            <span className="text-info">
              <RiHotelFill />
            </span>
            New Product
          </NavLink>
        </div>
      </div>
      <div>
        <span className="text-uppercase">User</span>
        <div className="d-flex flex-column ps-2 py-2 text-black-50">
          <span
            className="d-flex gap-2"
            style={{ cursor: "pointer" }}
            onClick={handlerLogout}
          >
            <span className="text-info">
              <RiLogoutBoxRLine />
            </span>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
