import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'

const PlaceOrder = ({ isOpen }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { cartItems, shippingAddress, shippingAddress : { address, city, country, postalCode }, paymentMethod } 
    = useSelector((state) => state.cart); 

    const { success, order, error } = useSelector((state) => state.orderCreate);

    if (!address) {
        history.push('/shipping')
    } else if (!paymentMethod) {
        history.push('/payment')
    }    

    useEffect(() => {
        if(success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: 'ORDER_CREATE_RESET' })
        }
        // eslint-disable-next-line
    }, [history, success])

    //Calcul des prix
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
    const shippingPrice = itemsPrice > 100 ? 0 : 2;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = (Number (itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

    
    const placeOrderHandler = () => { 
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }))
    }

    return ( 
        <div className={isOpen ? 'place-order open' : 'place-order'}>
            <div className="payment-infos-summary">
                <div className="shipping-summary">
                    <h3>Shipping</h3>
                    <p>
                        <strong>Address:</strong>{' '}
                        {address}, {city} {postalCode}, {' '} {country}
                    </p>
                </div>
                <div className="payment-summary">
                    <h3>Payment</h3>
                    <p>
                        <strong>Payment method:</strong>{' '}
                        {paymentMethod}
                    </p>
                </div>
                <div className="items-summary">
                    <h3>Cart</h3>
                    {cartItems.map((item) => 
                        <div className="item" key={item._id}>
                            <h4> {item.name} </h4>
                            <span> {item.qty} x {item.price} </span>
                        </div> 
                    )}
                </div>
            </div>
            <div className="fees">
                <h3>Total</h3>
                <p>
                    <strong>Items:</strong>
                    <span> $ {itemsPrice} </span>
                </p>
                <p>
                    <strong>Shipping:</strong>
                    <span> $ {shippingPrice} </span>
                </p>
                <p>
                    <strong>Taxes:</strong>
                    <span> $ {taxPrice} </span>
                </p>
                <p>
                    <strong>Total:</strong>
                    <span> $ {totalPrice} </span>
                </p>
                {error && <p className="error"> {error} </p>}
                <button onClick={placeOrderHandler}>Place Order</button>
            </div>
        </div>
    )
}

export default PlaceOrder
