import React, { useEffect } from 'react'
import { fetchProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Product from '../components/Product'
import Meta from '../components/Meta'
import Loading from '../components/Loading'

const SearchResult = ({isOpen}) => {
    const {keyword} = useParams();
    const dispatch = useDispatch();

    const { isLoading, error, products } = useSelector((state) => state.productList);

    useEffect(() => {
        dispatch(fetchProducts('',keyword));
    }, [dispatch, keyword])

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
        <div className={isOpen ? "search-result open" : "search-result"}>
            <Meta title='Search' />
            <h3>Results for "{keyword}" </h3>
            <div className= { products.length > 3 ? "products-found" : "products-found little" }>
                { 
                    isLoading ? (<Loading />) : error ? (<p className="error"> {error} </p>) : printProducts
                }
            </div>
        </div>
    )
}

export default SearchResult
