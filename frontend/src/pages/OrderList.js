import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../actions/orderActions'
import { Link, useHistory } from 'react-router-dom'
import Loading from '../components/Loading'

const OrderList = ({ isOpen }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { orders, isLoading, error } = useSelector((state) => state.allOrdersList);
    const { userInfo } = useSelector((state) => state.userLogin);

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(getAllOrders())
        } else {
            history.push('/');
        }
    }, [dispatch, history, userInfo])

    return (
        <div className={ isOpen ? "order-list open" : "order-list"}>
            <h2>Orders</h2>
            { isLoading ? (<Loading />) : error ? ( <p className="error"> {error} </p>) : orders.length === 0 ? 
            (<p>The list is empty</p>) : 
            (<div style={{ overflowX: "auto" }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}> 
                                        <td> {order._id} </td>
                                        <td> {order.user && order.user.name} </td>
                                        <td> {order.createdAt.substring(0, 10)} </td>
                                        <td> ${order.totalPrice} </td>
                                        <td> {order.isPaid ? order.paidAt.substring(0, 10) : ' - '} </td>
                                        <td> {order.isDelivered ? order.deliveredAt.substring(0, 10) : ' - '} </td>
                                        <td> <Link to={`/order/${order._id}`}> <button> Details </button> </Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>)
            }
        </div>
    )
}

export default OrderList
