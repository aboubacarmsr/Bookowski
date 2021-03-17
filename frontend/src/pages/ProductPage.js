import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, createProductReview } from "../actions/productActions";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import Rating from "../components/Rating";
import Meta from "../components/Meta";
import Loading from "../components/Loading";

const ProductPage = ({ isOpen }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { isLoading, error, product } = useSelector((state) => state.productDetails);
  const { error: errorReview, success: successReview } = useSelector((state) => state.productReview);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if(successReview) {
      toast.info('Review submitted');
      setRating(0);
      setComment('');
      dispatch({ type: 'PRODUCT_CREATE_REVIEW_RESET' })
    }
    dispatch(fetchProductDetails(id));
  }, [dispatch, id, successReview]);

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
        toast.error('This product is sold out.')
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, {rating, comment}))
  }

  return (
    <div className={isOpen ? "product-page open" : "product-page"}>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <p className="error"> {error} </p>
      ) : (
        <div className="product-page-info">
          <Meta title={product.name}/>
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
                <div className="reviews">
                  <h3>Reviews</h3>
                  {product.reviews.map(review => (
                      <div className="review" key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating rating={review.rating} />
                        <p> {review.createdAt.substring(0, 10)} </p>
                        <p> {review.comment} </p>
                      </div>
                    ))}
                    <div className="write-review">
                      {userInfo ? 
                      (<form onSubmit={submitHandler}>
                        <div className="rate">
                          <strong>Rating :</strong>
                          <select value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option value=''> Select </option> 
                            <option value='1'> 1 - Poor </option> 
                            <option value='2'> 2 - Fair </option> 
                            <option value='3'> 3 - Good </option> 
                            <option value='4'> 4 - Very Good </option> 
                            <option value='5'> 5 - Excellent </option> 
                          </select>
                        </div>
                        <div className="comment">
                          <textarea rows="10" cols="20"
                            placeholder="Write a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                        {errorReview && <p> {errorReview} </p>}
                        <button className="submit-button" type="submit"> SUBMIT </button>
                      </form>) : (<p> Please <Link to='/login'> sign in </Link> to write a review </p>)}
                    </div>
                </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
