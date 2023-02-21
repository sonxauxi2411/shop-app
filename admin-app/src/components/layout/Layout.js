import React from "react";
import Sidebar from "./Sidebar";
import "./layout.css";

function Layout({ children }) {
  return (
    <div className="d-flex flex-column ">
      <div className="row border-bottom">
        <div className="col-2 border-end ">
          <h3 className="text-info ">Admin Page</h3>
        </div>
        <div className="col-10"> header</div>
      </div>
      <div className="row">
        <div className="col-2  border-end sidebar">
          <Sidebar />
        </div>
        <div className="col-10" style={{ overflowY: "hidden" }}>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
