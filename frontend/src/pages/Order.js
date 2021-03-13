import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { PayPalButton } from 'react-paypal-button-v2';

const Order = ({ isOpen }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  //Recupérer l'id passé en paramètre dans l'url
  const { id } = useParams();
  const { order, isLoading, error } = useSelector((state) => state.orderDetails);
  const { success: successPay, isLoading: isLoadingPay} = useSelector((state) => state.orderPay);

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    
    if(!order || successPay || (order && order._id !== id)) {
      dispatch({ type: 'ORDER_PAY_RESET' })
      dispatch(getOrderDetails(id))
    } else if(!order.isPaid) {
      if(!window.paypal){
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, id, successPay, order]);


  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult))
  }

  return (
    <div className={isOpen ? "order open" : "order"}>
      {isLoading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p> {error} </p>
      ) : (
        <div>
            <h2>Order created</h2>
          <div className="payment-infos-summary">
            <div className="shipping-summary">
              <p>
                <strong>Order ID: </strong> {order._id}
              </p>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto: ${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address}, 
                {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {
                order.isDelivered ? (<p style={{ color: "green" }}> <strong> Delivery status: </strong> Delivered on {order.deliveredAt} </p>) :
                ( <p> <strong> Delivery status: </strong> Not delivered</p> )
              }
            </div>
            <div className="payment-summary">
              <p>
                <strong>Payment method:</strong> {order.paymentMethod}
              </p>
              {
                order.isPaid ? (<p style={{ color: "green" }}> <strong> Status: </strong> Paid on {order.paidAt} </p>) :
                ( <p> <strong> Payment status: </strong> Not paid</p> )
              }
            </div>
            <div>
              {
                !order.isPaid && (
                  <div>
                    {isLoadingPay && <p> Loading ...</p>}
                    {!sdkReady ? <p>Loading ...</p> : 
                      <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />}
                  </div>
                )
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
