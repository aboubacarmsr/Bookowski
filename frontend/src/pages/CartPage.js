import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteFromCart, updateQuantity } from '../actions/cartActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Meta from '../components/Meta'

const CartPage = ({ isOpen }) => {

    const { cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const history = useHistory();

    const { userInfo } = useSelector(state => state.userLogin);
    const isOnline = useSelector(state => state.userRegister.userInfo);

    const checkoutHandler = () => {
        if(userInfo || isOnline){
            history.push('/shipping')
            // history.push('/login?redirect=shipping')
        }
        else {
            history.push('/login')
        }
    }

    const printItems = cartItems.length === 0 ? (<h3>Your cart is empty.</h3>) :
    (
        cartItems.map(item => {
            return(
                <div className="item" key={item._id}>
                    <img src={item.image} alt={item.name}/>
                        <div className="item-name">
                            <h3> {item.name} </h3>
                            <h5> {item.author} </h5>
                        </div>
                        <div className="item-quantity">
                            <select value={item.qty} 
                                onChange={(e) => dispatch(updateQuantity(item, Number(e.target.value)))}>
                                {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option> 
                                ))}
                            </select>
                        </div> 
                        <div className="item-price">
                            <span> {`$ ${(item.price * item.qty).toFixed(2)}`} </span>
                        </div>
                        <div className="item-remove">
                            <FontAwesomeIcon icon={faTimes} onClick={(e) => dispatch(deleteFromCart(item))}/> 
                        </div>
                </div>
            )
        })
    )

    return (
        <div className={ isOpen ? "cart-page open" : "cart-page"}>
            <Meta title='My Cart'/>
            <h1 className="title">Items in my cart</h1>
            <div className="cart-wrapper">
                <div className="items-in-cart">
                    {
                        printItems
                    }
                </div>
                <div className="summary">
                    <h1>Summary</h1>
                    <div className="shopping-infos">
                        <div className="total">
                            <h3> <span> Quantity : </span> ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items </h3>
                            <h3> <span> Total : </span>  ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)} </h3>
                        </div>
                        <div className="payment">
                            <button disabled={ cartItems.length === 0 } onClick={checkoutHandler}> Pay Now </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default CartPage
