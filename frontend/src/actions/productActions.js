import axios from "axios";

export const fetchProducts = (pageNumber= '', keyword = '') => async (dispatch) => {
  //Pour toute requete on dispatch le type REQUEST pour mettre isLoading à true et initialiser les valeurs
  //Ensuite on fait une requete sur notre route puis on recupère valeur.data, si succès appeler SUCCESS sinon FAIL
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });

    const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
 
    dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PRODUCT_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'PRODUCT_DETAILS_REQUEST' });

        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({ type: 'PRODUCT_DETAILS_SUCCESS', payload: data });
    } catch (error) {
        dispatch({
            type: 'PRODUCT_DETAILS_FAIL',
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'PRODUCT_DELETE_REQUEST' });

        const { userLogin: {userInfo} } = getState();

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          },
        };

        await axios.delete(`/api/products/${id}`, config);

        dispatch({ type: 'PRODUCT_DELETE_SUCCESS' });
    } catch (error) {
        dispatch({
            type: 'PRODUCT_DELETE_FAIL',
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({ type: 'PRODUCT_CREATE_REQUEST' });

        const { userLogin: {userInfo} } = getState();

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          },
        };

        const { data } = await axios.post(`/api/products`, {}, config);

        dispatch({ 
          type: 'PRODUCT_CREATE_SUCCESS', 
          payload: data 
        });
    } catch (error) {
        dispatch({
            type: 'PRODUCT_CREATE_FAIL',
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'PRODUCT_UPDATE_REQUEST' });

        const { userLogin: {userInfo} } = getState();

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
          },
        };

        const { data } = await axios.put(`/api/products/${product._id}`, product, config);

        dispatch({ 
          type: 'PRODUCT_UPDATE_SUCCESS', 
          payload: data 
        });
    } catch (error) {
        dispatch({
            type: 'PRODUCT_UPDATE_FAIL',
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const createProductReview = (productID, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'PRODUCT_CREATE_REVIEW_REQUEST' });

        const { userLogin: {userInfo} } = getState();

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
          },
        };

        await axios.post(`/api/products/${productID}/reviews`, review, config);

        dispatch({ type: 'PRODUCT_CREATE_REVIEW_SUCCESS' });
    } catch (error) {
        dispatch({
            type: 'PRODUCT_CREATE_REVIEW_FAIL',
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};