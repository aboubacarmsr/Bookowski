import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getOrderDetails, payOrder, deliverOrder } from "../actions/orderActions";
import { PayPalButton } from 'react-paypal-button-v2';
import Loading from "../components/Loading";

const Order = ({ isOpen }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  //Recupérer l'id passé en paramètre dans l'url
  const { id } = useParams();
  const { order, isLoading, error } = useSelector((state) => state.orderDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: successPay, isLoading: isLoadingPay} = useSelector((state) => state.orderPay);
  const { success: successDeliver, isLoading: isLoadingDeliver} = useSelector((state) => state.orderDeliver);

  useEffect(() => {
    if(!userInfo){
      history.push('/login');
    }
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
    
    if(!order || successPay || successDeliver || (order && order._id !== id)) {
      dispatch({ type: 'ORDER_PAY_RESET' })
      dispatch({ type: 'ORDER_DELIVER_RESET' })
      dispatch(getOrderDetails(id))
    } else if(!order.isPaid) {
      if(!window.paypal){
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, id, successPay, order, successDeliver, history, userInfo]);


  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return (
    <div className={isOpen ? "order open" : "order"}>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <p className="error"> {error} </p>
      ) : (
        <div>
            <h2>Order created</h2>
            <div className="items-summary">
                    {order.orderItems.map((item) => 
                        <div className="item" key={item._id}>
                            <h4> {item.name} </h4>
                            <span> {item.qty} x {item.price} </span>
                        </div> 
                    )}
              </div>
              <div className="fees-summary">
                <p><strong>Taxes :</strong> ${order.taxPrice}</p>
                <p><strong>Shipping :</strong> ${order.shippingPrice}</p>
                <p><strong>Total : ${order.totalPrice}</strong></p>
              </div>
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
                    {isLoadingPay && <Loading />}
                    {!sdkReady ? <p>Loading ...</p> : 
                      <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />}
                  </div>
                )
              }
              {isLoadingDeliver && <Loading />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && 
              <button onClick={deliverHandler}> Mark As Delivered </button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
