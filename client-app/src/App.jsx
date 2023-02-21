import "./App.css";
import "./css/custom.css";
import "./css/style.default.css";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import Footer from "./Share/Footer/Footer";
import Header from "./Share/Header/Header";
import Home from "./Home/Home";
import Detail from "./Detail/Detail";
import Cart from "./Cart/Cart";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import Checkout from "./Checkout/Checkout";
import History from "./History/History";
import Shop from "./Shop/Shop";
import Chat from "./Share/Chat/Chat";
import RouterPrivate from "./router/RouterPrivate";
import { useState } from "react";
import MainHistory from "./History/Component/MainHistory";
import DetailHistory from "./History/Component/DetailHistory";

function App() {
  const user = localStorage.getItem("id_user");

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* ------ router private  -------*/}
          <Route element={<RouterPrivate />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/history" element={<MainHistory />} />
            <Route path="/history/:id" element={<DetailHistory />} />
          </Route>

          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/chat" element={<Chat />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />

          {/* ----------đăng nhập rồi thì không được vào signin và signup --------*/}
          <Route path="/signin" element={user ? <Home /> : <SignIn />} />
          <Route path="/signup" element={user ? <Home /> : <SignUp />} />
        </Routes>
      </BrowserRouter>

      <Chat />

      <Footer />
    </div>
  );
}

export default App;
