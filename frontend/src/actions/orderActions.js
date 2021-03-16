import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
          type: "ORDER_CREATE_REQUEST",
        });
    
        //Double destructuration: récupérer userInfo dans le store
        const { userLogin: {userInfo} } = getState();
    
        //Une fois récupéré, le userInfo est envoyé en tant qu'autorisation dans headers
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`
          },
        };
    
        const { data } = await axios.post(`/api/orders`, order, config);
    
        dispatch({
          type: "ORDER_CREATE_SUCCESS",
          payload: data,
        });

        dispatch({
          type: "CART_CLEAR_ITEMS",
          payload: data,
        });
        localStorage.removeItem('cartItems')
      } catch (error) {
        dispatch({
          type: "ORDER_CREATE_FAIL",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
          type: "ORDER_DETAILS_REQUEST",
        });
    
        //Double destructuration: récupérer userInfo dans le store
        const { userLogin: {userInfo} } = getState();
    
        //Une fois récupéré, le userInfo est envoyé en tant qu'autorisation dans headers
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          },
        };
    
        const { data } = await axios.get(`/api/orders/${id}`, config);
    
        dispatch({
          type: "ORDER_DETAILS_SUCCESS",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "ORDER_DETAILS_FAIL",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
}

export const payOrder = (orderID, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
          type: "ORDER_PAY_REQUEST",
        });
    
        //Double destructuration: récupérer userInfo dans le store
        const { userLogin: {userInfo} } = getState();
    
        //Une fois récupéré, le userInfo est envoyé en tant qu'autorisation dans headers
        const config = {
          headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
          },
        };
    
        const { data } = await axios.put(`/api/orders/${orderID}/pay`, paymentResult, config);
    
        dispatch({
          type: "ORDER_PAY_SUCCESS",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "ORDER_PAY_FAIL",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
          type: "ORDER_DELIVER_REQUEST",
        });
    
        //Double destructuration: récupérer userInfo dans le store
        const { userLogin: {userInfo} } = getState();
    
        //Une fois récupéré, le userInfo est envoyé en tant qu'autorisation dans headers
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          },
        };
    
        const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config);
    
        dispatch({
          type: "ORDER_DELIVER_SUCCESS",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "ORDER_DELIVER_FAIL",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
}

export const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
          type: "MY_ORDERS_LIST_REQUEST",
        });
    
        //Double destructuration: récupérer userInfo dans le store
        const { userLogin: {userInfo} } = getState();
    
        //Une fois récupéré, le userInfo est envoyé en tant qu'autorisation dans headers
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          },
        };
    
        const { data } = await axios.get(`/api/orders/myorders`, config);
    
        dispatch({
          type: "MY_ORDERS_LIST_SUCCESS",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "MY_ORDERS_LIST_FAIL",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
}

export const getAllOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
          type: "ALL_ORDERS_LIST_REQUEST",
        });
    
        //Double destructuration: récupérer userInfo dans le store
        const { userLogin: {userInfo} } = getState();
    
        //Une fois récupéré, le userInfo est envoyé en tant qu'autorisation dans headers
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          },
        };
    
        const { data } = await axios.get(`/api/orders`, config);
    
        dispatch({
          type: "ALL_ORDERS_LIST_SUCCESS",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "ALL_ORDERS_LIST_FAIL",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
}
