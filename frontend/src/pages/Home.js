import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../actions/productActions'
import { Link } from 'react-router-dom'
import Product from '../components/Product'
import Meta from '../components/Meta'
import Loading from '../components/Loading'

const Home = ({ isOpen }) => {
    const dispatch = useDispatch();
    const { isLoading, error, products } = useSelector((state) => state.productList);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    let printProducts;
    if(!error) {
        printProducts = products.slice(0,6).map((product) => 
        <Product 
            key = {product._id}
            id = {product._id}
            image = {product.image}
            author = {product.author}
            name = {product.name}
            price = {product.price}
        />
        )
    }

    return (
        <div className={ isOpen ? "home open" : "home"}>
            <Meta />
            <div className="welcome">
                <div className="welcome-text">
                    <h1>Find your next favorite book</h1>
                    <p>Looking for a <span>classic</span> ? A High school read ? A book to offer ?</p>
                    <p>We probably have exactly what you need.</p>
                    <Link to='/shop/1'><button>EXPLORE</button></Link>
                </div>
                <div className="welcome-image">
                    <img src="/images/cover.jpg" alt=""/>
                </div>
            </div>
            <div className="title"> 
                <h3>Latest Books</h3>
            </div>
            <div className="products">
                { 
                    isLoading ? <Loading /> : error ? (<p className="error"> {error} </p>) : printProducts
                }
            </div>
        </div>
    )
}

export default Home
