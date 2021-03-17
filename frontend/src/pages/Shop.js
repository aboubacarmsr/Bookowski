import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../actions/productActions'
import { useParams } from 'react-router-dom'
import Product from '../components/Product'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import Loading from '../components/Loading'

const Shop = ({ isOpen }) => {
    const dispatch = useDispatch();

    const {pageNumber} = useParams();

    const { isLoading, error, products, page, pages } = useSelector((state) => state.productList);

    useEffect(() => {
        dispatch(fetchProducts(pageNumber));
    }, [dispatch, pageNumber])

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
        <div className={ isOpen ? "shop open" : "shop"}>
            <Meta title='Explore our books collection' />
            <div className="title"> 
                <h3>Shop</h3>
            </div>
            <div className= { products.length > 3 ? "products" : "products little" }>
                { 
                    isLoading ? (<Loading />) : error ? (<p className="error"> {error} </p>) : printProducts
                }
            </div>
            <div className="pagination">
                <Paginate pages={pages} page={page}/>
            </div>
        </div>
    )
}

export default Shop
