export const addToCart = (product) => (dispatch, getState) => {
    dispatch({
        type: "ADD_TO_CART",
        payload: product
    })

    // Mise à jour du localstorage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const deleteFromCart = (product) => (dispatch, getState) => {
    dispatch({
        type: "DELETE_FROM_CART",
        payload: product
    })
    // Mise à jour du localstorage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const updateQuantity = (product, quantity) => (dispatch, getState) => {
    dispatch({
        type: "UPDATE_QUANTITY",
        payload: {
            product,
            quantity
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
} 

export const saveShippingAddress = (infos) => (dispatch) => {
    dispatch({
        type: "CART_SAVE_SHIPPING_ADDRESS",
        payload: infos
    })
    // Mise à jour du localstorage
    localStorage.setItem('shippingAddress', JSON.stringify(infos));
}

export const savePaymentMethod = (method) => (dispatch) => {
    dispatch({
        type: "CART_SAVE_PAYMENT_METHOD",
        payload: method
    })
    // Mise à jour du localstorage
    localStorage.setItem('paymentMethod', JSON.stringify(method));
}
