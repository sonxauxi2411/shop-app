import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";

function RouterPrivate() {
  //console.log(localStorage.getItem("id_user"));
  //console.log(Cookies.get("id_user"));

  return localStorage.getItem("id_user") ? <Outlet /> : <Navigate to="/" />;
}

export default RouterPrivate;
