import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import Search from './Search'

const SideNav = ({ setIsOpen, isOpen }) => {
    const { userInfo } = useSelector((state) => state.userLogin);
    return (
        <div className={isOpen ? "sidenav sidenav-open" : "sidenav"}>
            <div className="head">
                <div className="logo">
                    <Link to='/' style={{ color: "#000" }}> Bookowski </Link>
                </div>
                <FontAwesomeIcon icon={faTimes} onClick={() => setIsOpen(false)} style={{ cursor: "pointer" }}/>
            </div>
            <div className="searchbar">
                <Search sidenav />
            </div>
            <div className="menu">
                <ul>
                    <li><NavLink exact to='/shop/a' style={{ color: "#000" }} activeStyle={{ color: "#ff304f" }}> shop </NavLink></li>
                    <li>genres</li>
                    <li>authors</li>
                    <li>find a store</li>
                    <li><NavLink exact to='/login' style={{ color: "#000" }} activeStyle={{ color: "#ff304f" }}>my account</NavLink></li>
                    <li><NavLink to='/cart' style={{ color: "#000" }} activeStyle={{ color: "#ff304f" }}>cart</NavLink></li>
                    {userInfo && userInfo.isAdmin &&  
                        <li className="user-list-link"><NavLink to='/admin/userlist' style={{ color: "#000" }}>Users</NavLink></li>}
                    {userInfo && userInfo.isAdmin && 
                        <li className="product-list-link"><NavLink to='/admin/productlist' style={{ color: "#000" }}>Products</NavLink></li>}
                    {userInfo && userInfo.isAdmin && 
                        <li className="order-list-link"><NavLink to='/admin/orderlist' style={{ color: "#000" }}>Orders</NavLink></li>}                </ul>
            </div>
            <div className="social">
                <ul>
                    <li>Designed and built by <a href="https://www.facebook.com/aboubacarmsr/">Aboubacar Mansare</a></li>
                </ul>
            </div>
        </div>
    )
}

export default SideNav
