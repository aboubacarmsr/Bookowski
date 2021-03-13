import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../actions/productActions'
import Product from '../components/Product'

const Home = ({ isOpen }) => {

    const dispatch = useDispatch();
    const { isLoading, error, products } = useSelector((state) => state.productList);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    let printProducts;
    if(!error) {
        printProducts = products.map((product) => 
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
            <div className="welcome">
                <div className="welcome-text">
                    <h1>Meet your next favorite book</h1>
                    <p>Looking for a <span>classic</span> ? A High school read ? A book to offer ?</p>
                    <p>We probably have exactly what you need.</p>
                    <button>EXPLORE</button>
                </div>
                <div className="welcome-image">
                    <img src="/images/cover.jpg" alt=""/>
                </div>
            </div>
            <div className="title"> 
                <h3>Selected Books</h3>
            </div>
            <div className="products">
                { 
                    isLoading ? (<p> Loading ... </p>) : error ? (<h2> {error} </h2>) : printProducts
                }
            </div>
        </div>
    )
}

export default Home
