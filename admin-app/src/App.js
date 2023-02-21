import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./page/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import Home from "./page/home/Home";
import Cookies from "js-cookie";
import RouterPrivate from "./router/RouterPrivate";
import Product from "./page/product/Product";
import User from "./page/user/User";
import ChatRoom from "./page/chat/ChatRoom";
import NewProducts from "./page/product/NewProducts";

function App() {
  const role = Cookies.get("role");
  console.log(Cookies.get("role"));
  return (
    <div className="App">
      {/* router private  : xác định role  */}
      <Routes>
        <Route element={<RouterPrivate />}>
          <Route
            path="/dashboard"
            element={
              role === "counselor" ? (
                <Navigate to="/chat-rooms" />
              ) : (
                <Layout>
                  <Dashboard />
                </Layout>
              )
            }
          />
          <Route
            path="/products"
            element={
              role === "counselor" ? (
                <Navigate to="/chat-rooms" />
              ) : (
                <Layout>
                  <Product />
                </Layout>
              )
            }
          />
          <Route
            path="/users"
            element={
              role === "counselor" ? (
                <Navigate to="/chat-rooms" />
              ) : (
                <Layout>
                  <User />
                </Layout>
              )
            }
          />
          <Route
            path="/chat-rooms"
            element={
              <Layout>
                <ChatRoom />
              </Layout>
            }
          />
          <Route
            path="/add-product"
            element={
              role === "counselor" ? (
                <Navigate to="/chat-rooms" />
              ) : (
                <Layout>
                  <NewProducts />
                </Layout>
              )
            }
          />
        </Route>
        {/* router private  */}
        {/*khi ko có user mới vào trang home để đăng nhập  */}

        <Route
          path="/"
          element={
            Cookies.get("id_user") ? <Navigate to="/dashboard" /> : <Home />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
