import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../API/axiosClient";
import UserAPI from "../API/UserAPI";
import { deleteSession } from "../Redux/Action/ActionSession";

function LoginLink(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onRedirect = async () => {
    try {
      const res = await UserAPI.postLogout();
      localStorage.clear();
      const action = deleteSession("");
      dispatch(action);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="nav-item" onClick={onRedirect}>
      <Link className="nav-link" to="/signin">
        ( Logout )
      </Link>
    </li>
  );
}

export default LoginLink;
