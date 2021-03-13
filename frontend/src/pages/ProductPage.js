import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../actions/productActions";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Rating from "../components/Rating";

const ProductPage = ({ isOpen }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [addedAnimation, setAddedAnimation] = useState(false);

  const { isLoading, error, product } = useSelector((state) => state.productDetails);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  //ADD OR REMOVE FROM CART
  const productExists = cartItems.find((item) => item._id === id);

  const addToCartHandler = () => {
    if (productExists) {
      setAddedAnimation(false);
      dispatch(deleteFromCart(product));
    } else if (!productExists && product.countInStock > 0) {
      setAddedAnimation(true);
      setTimeout(() => {
        setAddedAnimation(false);
      }, 4000);
      dispatch(addToCart(product));
    }
    else {
        alert('This product is sold out.')
    }
  };

  return (
    <div className={isOpen ? "product-page open" : "product-page"}>
      {isLoading ? (
        <p> Loading ... </p>
      ) : error ? (
        <h2> {error} </h2>
      ) : (
        <div className="product-page-info">
          <div className="product-details">
            <div className="product-image">
              <img src={product.image} alt="" />
            </div>
          </div>
          <div className="product-description">
            <h2 className="name"> {product.name} </h2>
            <h3 className="author">{`by ${product.author}`} </h3>
            <p className="more-details"> {product.description} </p>
                <div className="product-additional-info">
                  <div className="box1">
                    <div className="genre">
                      <h4> Genres </h4>
                      <h6> {product.genre} </h6>
                    </div>
                    <div className="date">
                      <h4> Publication</h4>
                      <h6> {product.publicationDate ? (product.publicationDate).slice(0, 10) : 'unknown'} </h6>
                    </div>
                    <div className="publisher">
                      <h4> Publisher </h4>
                      <h6>{product.publisher}</h6>
                    </div>
                    <div className="language">
                      <h4> Language </h4>
                      <h6>{product.language}</h6>
                    </div>
                  </div>
                  <div className="box2">
                    <div className="printLength">
                      <h4> Print Length </h4>
                      <h6>{product.printLength}</h6>
                    </div>
                    <div className="rating">
                      <h4> Rating </h4>
                      <Rating rating={product.rating} />
                    </div>
                    <div className="review">
                      <h4> Review </h4>
                      <h6 className="review-count">
                        {`${product.numReviews} reviews`}
                      </h6>
                    </div>
                    <div className="status">
                      <h4> Status </h4>
                      <h6 className={product.countInStock > 0 ? "in-stock" : "sold-out"}>
                        {product.countInStock > 0 ? "In Stock" : "Sold Out"}
                      </h6>
                    </div>
                  </div>
            </div>
            {/* Paiement */}
            <div className="price">
                <h6> {`$  ${product.price}`} </h6>
              </div> 
                <div className="buttons"> 
                  <button className={addedAnimation ? "cart-button clicked" : "cart-button"} onClick={addToCartHandler}> 
                    <span className="add-to-cart">{productExists ? "Remove From Cart" : "Add To Cart"}</span> 
                    <span className="added">Item Added!</span>
                    <FontAwesomeIcon icon={faShoppingCart} className="fa-shopping-cart" /> 
                    <FontAwesomeIcon icon={faSquare} className="fa-square" /> 
                  </button> 
                </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
