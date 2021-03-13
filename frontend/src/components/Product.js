import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ author, name, price, image, id }) => {
    return (
        <div className="product">
            <Link style={{ color: "#000" }} to={{ pathname: `/product/${id}` }} >
                <img src={image} alt=""/>
                <div className="product-card"> 
                    <h3 className="author"> {author} </h3>
                    <h2 className="name"> {name} </h2>
                    <h3 className="price"> $ {price} </h3>
                </div>
            </Link>
        </div>
    )
}

export default Product
