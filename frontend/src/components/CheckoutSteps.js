import React from 'react'
import { NavLink } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div className="checkout-steps">
            {
                step1 && 
                <NavLink to='/login' activeClassName="step-active">
                    Sign In
                </NavLink>
            }
            {
                step2 && 
                <NavLink to='/shipping' activeClassName="step-active">
                    Shipping
                </NavLink>
            }
            {
                step3 && 
                <NavLink to='/payment' activeClassName="step-active">
                    Payment
                </NavLink>
            }
            {
                step4 && 
                <NavLink to='/placeorder' activeClassName="step-active">
                    Place Order
                </NavLink>
            }
        </div>
    )
}
 
export default CheckoutSteps
