import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles/App.scss";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import SideNav from "./components/SideNav";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import UserList from "./pages/UserList";
import UserEdit from "./pages/UserEdit";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";
import OrderList from "./pages/OrderList";
import SearchResult from "./pages/SearchResult";
import Shop from "./pages/Shop";
import Footer from "./components/Footer";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="App">
      <Header isOpen={menuOpen} setIsOpen={setMenuOpen} />
      <SideNav isOpen={menuOpen} setIsOpen={setMenuOpen} />
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <Home isOpen={menuOpen} />
        </Route>
        <Route path="/product/:id">
          <ProductPage isOpen={menuOpen} />
        </Route>
        <Route path="/cart">
          <CartPage isOpen={menuOpen} />
        </Route>
        <Route path="/login">
          <LoginPage isOpen={menuOpen} />
        </Route>
        <Route path="/register">
          <RegisterPage isOpen={menuOpen} />
        </Route>
        <Route path="/profile">
          <Profile isOpen={menuOpen} />
        </Route>
        <Route path="/shipping">
          <Shipping isOpen={menuOpen} />
        </Route>
        <Route path="/payment">
          <Payment isOpen={menuOpen} />
        </Route>
        <Route path="/placeorder">
          <PlaceOrder isOpen={menuOpen} />
        </Route>
        <Route path="/order/:id">
          <Order isOpen={menuOpen} />
        </Route>
        <Route path="/admin/userlist">
          <UserList isOpen={menuOpen} />
        </Route>
        <Route path="/admin/productlist">
          <ProductList isOpen={menuOpen} />
        </Route>
        <Route path="/admin/orderlist">
          <OrderList isOpen={menuOpen} />
        </Route>
        <Route path="/admin/product/:id/edit">
          <ProductEdit isOpen={menuOpen}/>
        </Route>
        <Route path="/admin/user/:id/edit">
          <UserEdit isOpen={menuOpen}/>
        </Route>
        <Route path="/search/:keyword">
          <SearchResult isOpen={menuOpen} />
        </Route>
        <Route path="/shop/:pageNumber">
          <Shop isOpen={menuOpen} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
