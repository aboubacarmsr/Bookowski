export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ORDER_CREATE_REQUEST':
            return {
                isLoading: true
            } 
        case 'ORDER_CREATE_SUCCESS':
            return {
                isLoading: false,
                success: true,
                order: action.payload
            } 
        case 'ORDER_CREATE_FAIL':
            return {
                isLoading: false,
                error: action.payload
            }
        case 'ORDER_CREATE_RESET':
            return {}
        default:
            return state;
    }
}

export const orderDetailsReducer = (state = { isLoading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case 'ORDER_DETAILS_REQUEST':
            return {
                ...state,
                isLoading: true
            } 
        case 'ORDER_DETAILS_SUCCESS':
            return {
                isLoading: false,
                order: action.payload
            } 
        case 'ORDER_DETAILS_FAIL':
            return {
                isLoading: false,
                error: action.payload
            }  
        default:
            return state;
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ORDER_PAY_REQUEST':
            return {
                isLoading: true
            } 
        case 'ORDER_PAY_SUCCESS':
            return {
                isLoading: false,
                success: true
            } 
        case 'ORDER_PAY_FAIL':
            return {
                isLoading: false,
                error: action.payload
            }  
        case 'ORDER_PAY_RESET': 
            return {}
        default:
            return state;
    }
}

export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ORDER_DELIVER_REQUEST':
            return {
                isLoading: true
            } 
        case 'ORDER_DELIVER_SUCCESS':
            return {
                isLoading: false,
                success: true
            } 
        case 'ORDER_DELIVER_FAIL':
            return {
                isLoading: false,
                error: action.payload 
            }  
        case 'ORDER_DELIVER_RESET': 
            return {}
        default:
            return state;
    }
}

export const myOrdersListReducer = (state = { myOrders: [] }, action) => {
    switch (action.type) {
        case 'MY_ORDERS_LIST_REQUEST':
            return {
                isLoading: true
            } 
        case 'MY_ORDERS_LIST_SUCCESS':
            return {
                isLoading: false,
                myOrders: action.payload
            } 
        case 'MY_ORDERS_LIST_FAIL':
            return {
                isLoading: false,
                error: action.payload
            }
        case 'MY_ORDERS_LIST_RESET':
            return { orders:[] }  
        default:
            return state;
    }
}

export const allOrdersListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case 'ALL_ORDERS_LIST_REQUEST':
            return {
                isLoading: true
            } 
        case 'ALL_ORDERS_LIST_SUCCESS':
            return {
                isLoading: false,
                orders: action.payload
            } 
        case 'ALL_ORDERS_LIST_FAIL':
            return {
                isLoading: false,
                error: action.payload
            } 
        default:
            return state;
    }
}