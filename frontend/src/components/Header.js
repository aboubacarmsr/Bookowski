import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { useHistory } from 'react-router-dom'
import Search from './Search'

const Header = ({isOpen, setIsOpen}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.userLogin);

    const logoutHandler = () => {
        dispatch(logout());
        history.push('/');
    }

    return (
        <header className={isOpen ? "header open" : ""}>
            <div className="menu">
                <FontAwesomeIcon icon={faBars} onClick= {() => setIsOpen(!isOpen)} /> 
                <div className="logo"> 
                    <Link to='/' style={{ color: "#000" }}> Bookowski </Link>
                </div>
            </div>
            <div className="center-menu">
                <ul>
                    <li><NavLink exact to='/shop/1' style={{ color: "#000" }} activeClassName="navlink-active">shop</NavLink></li>
                    <li>genres</li>
                    <li>authors</li>
                    <li>find a store</li>
                </ul>
            </div>
            <div className="search">
                <Search />
            </div>
            <div className="right-menu">
                <ul> 
                    <li><NavLink to={userInfo ? '/profile' : '/login'} style={{ color: "#000" }}>
                        <FontAwesomeIcon icon={faUser} className='user-logo' style={{ color: "#fff" }}/>
                        </NavLink>
                    </li>
                    {userInfo && userInfo.isAdmin &&  
                        <li className="user-list-link"><NavLink to='/admin/userlist' style={{ color: "#000" }}>Users</NavLink></li>}
                    {userInfo && userInfo.isAdmin && 
                        <li className="product-list-link"><NavLink to='/admin/productlist' style={{ color: "#000" }}>Products</NavLink></li>}
                    {userInfo && userInfo.isAdmin && 
                        <li className="order-list-link"><NavLink to='/admin/orderlist' style={{ color: "#000" }}>Orders</NavLink></li>}
                    {userInfo && <li className="logout" onClick={logoutHandler}>Logout</li>} 
                    <li><NavLink to='/cart' style={{ color: "#000" }}>
                        <FontAwesomeIcon icon={faShoppingBag} />
                        </NavLink>
                    </li>
                    <li className="cart-size">{cartItems.length}</li> 
                </ul>
            </div>
        </header>
    )
}

export default Header
