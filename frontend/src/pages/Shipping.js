import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";

const Shipping = ({ isOpen }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cart);

  const [country, setCountry] = useState(shippingAddress.country);
  const [city, setCity] = useState(shippingAddress.city);
  const [address, setAddress] = useState(shippingAddress.address);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ country, city, address, postalCode }));
    history.push("/payment");
  };

  return (
    <div className={isOpen ? "shipping open" : "shipping"}>
        <div className="shipping-form">
        <h3>Shipping</h3>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
          <button type="submit">Go to payment</button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
