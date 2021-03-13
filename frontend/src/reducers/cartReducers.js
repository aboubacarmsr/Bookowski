const initState = {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: ''
}

export const cartReducer = ( state = initState, action ) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            //Ajouter la propriété quantité au produit à ajouter
            const newProduct = {...action.payload, qty: 1}
            return {
                ...state,
                cartItems: [...state.cartItems, newProduct]
            }
        case 'DELETE_FROM_CART': 
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item._id !== action.payload._id)
            }
        case 'UPDATE_QUANTITY':
            const updatedItems = state.cartItems.map((item) => {
                if(item._id === action.payload.product._id){
                    return {
                        ...item,
                        qty: action.payload.quantity
                    }
                } else {
                    return item;
                }
            })

            return {
                ...state,
                cartItems: updatedItems
            }
        case 'CART_SAVE_SHIPPING_ADDRESS':
            return {
                ...state,
                shippingAddress: action.payload,
            }
        case 'CART_SAVE_PAYMENT_METHOD':
            return {
                ...state,
                paymentMethod: action.payload,
            }
        case 'CART_CLEAR_ITEMS':
            return {
                ...state,
                cartItems: [],
            }
        default:
            return state;
    }
}
