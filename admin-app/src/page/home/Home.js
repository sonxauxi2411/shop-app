import React, { useState } from "react";
import { useDispatch } from "react-redux";
import queryString from "query-string";
import UserAPI from "../../api/userApi";
import Cookies from "js-cookie";
import "./home.css";
import { addSession } from "../../Redux/Action/ActionSession";
import { useNavigate } from "react-router-dom";

function Home() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [emailRegex, setEmailRegex] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(user);
    if (!email) {
      setErrorEmail(true);
      return;
    } else {
      if (!password) {
        setErrorEmail(false);
        setErrorPassword(true);
        return;
      } else {
        setErrorPassword(false);

        if (!validateEmail(email)) {
          setEmailRegex(true);
          return;
        } else {
          setEmailRegex(false);
          const fetchLogin = async () => {
            const params = { email: email, password: password };
            const query = "?" + queryString.stringify(params);
            //console.log(query);

            try {
              // console.log(query);
              const res = await UserAPI.postLogin(query);
              Cookies.set("id_user", res.userId);
              Cookies.set("role", res.role);
              Cookies.set("name_user", res.fullname);
              console.log(res);
              // localStorage.setItem("id_user", res.userId);
              // localStorage.setItem("role", res.role);

              // localStorage.setItem("name_user", res.fullname);

              // const action = addSession(localStorage.getItem("id_user"));
              const action = addSession(Cookies.get("id_user"));

              dispatch(action);

              setRedirect(true);
            } catch (error) {
              setError(error.message);
            }
          };
          fetchLogin();
        }
      }
    }
  };
  //ref lai trang
  const replacePage = () => {
    if (Cookies.get("role") === "counselor") {
      navigate("/chat-rooms");
      navigate(0);
    } else {
      navigate("/dashboard");
    }
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h1 className="fadeIn first">Admin Login</h1>
        <div className="d-flex justify-content-center pb-5">
          {emailRegex && (
            <span className="text-danger">* Incorrect Email Format</span>
          )}
          {errorEmail && (
            <span className="text-danger">* Please Check Your Email</span>
          )}
          {errorPassword && (
            <span className="text-danger">* Please Check Your Password</span>
          )}
          {error && <span className="text-danger">* {error}</span>}
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <input
              className="input100"
              type="email"
              placeholder="Email"
              value={email}
              onChange={onChangeEmail}
            />
            <input
              className="input100"
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          {redirect && replacePage()}
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>
      </div>
    </div>
  );
}

export default Home;
