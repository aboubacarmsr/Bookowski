import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";

const Payment = ({ isOpen }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cart);

  if(!shippingAddress.address) {
      history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <div className={isOpen ? "payment open" : "payment"}>
        <div className="payment-form">
        <h3>Please select your payment method</h3>
        <form onSubmit={submitHandler}>
          <input type="radio" name="payment" id="paypal" value='PayPal' 
           checked onChange={(e) => setPaymentMethod(e.target.value)}/>
          <label htmlFor="paypal">Paypal or Credit Card</label>
          {/* <input type="radio" name="payment" id="stripe" value='Stripe' onChange={(e) => setPaymentMethod(e.target.value)}/>
          <label htmlFor="stripe">Stripe</label> */}
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
