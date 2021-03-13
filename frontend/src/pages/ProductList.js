import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, deleteProduct, createProduct } from '../actions/productActions'
import { Link, useHistory } from 'react-router-dom'

const ProductList = ({ isOpen }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { products, isLoading, error } = useSelector((state) => state.productList);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { isLoading: isLoadingDelete, error: errorDelete, success: successDelete } = 
        useSelector((state) => state.productDelete);
    const { isLoading: isLoadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = 
        useSelector((state) => state.productCreate);

    useEffect(() => {
        dispatch({ type: 'PRODUCT_CREATE_RESET' })

        if(!userInfo.isAdmin) {
            history.push('/');
        }

        if(successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(fetchProducts())
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if (window.confirm('Do you want to delete that product ?')) {
            dispatch(deleteProduct(id));
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct());
    }

    return (
        <div className={ isOpen ? "product-list open" : "product-list"}>
            <div className="top">
            <h2>Products</h2>
            <button onClick={createProductHandler}> Create product </button>
            </div>
            { isLoadingDelete && <p>Loading ...</p> }
            { errorDelete && <p>{errorDelete}</p> }
            { isLoadingCreate && <p>Loading ...</p> }
            { errorCreate && <p>{errorCreate}</p> }
            { isLoading ? (<p> Loading ... </p>) : error ? ( <h2> {error} </h2>) : products.length === 0 ? 
            (<p>The list is empty</p>) : 
            (<div style={{ overflowX: "auto" }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>AUTHOR</th>
                                    <th>PRICE</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}> 
                                        <td> {product._id} </td>
                                        <td> {product.name} </td>
                                        <td> {product.author} </td>
                                        <td> {product.price} </td>
                                        <td> <Link to={`/admin/product/${product._id}/edit`}> <button> Edit </button> </Link></td>
                                        <td> <button onClick={() => deleteHandler(product._id)}> Delete </button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>)
            }
        </div>
    )
}

export default ProductList
