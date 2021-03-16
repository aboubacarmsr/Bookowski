import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile }  from '../actions/userActions'
import { getMyOrders } from '../actions/orderActions'
import { useHistory, Link } from 'react-router-dom'
import Meta from '../components/Meta'

const Profile = ({ isOpen }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    
    const dispatch = useDispatch();
    const history= useHistory(); 

    //userInfo ici (différent du userInfo du Login) est créé uniquement si l'inscription a reussi
    const { isLoading, error, user } = useSelector(state => state.userDetails);

    //Pour pouvoir rediriger s'il est déjà en ligne on va vérifier l'existence du userInfo dans userLogin
    const { userInfo } = useSelector(state => state.userLogin);    

    //Pour pouvoir rediriger s'il est déjà en ligne on va vérifier l'existence du userInfo dans userLogin
    const { success } = useSelector(state => state.userUpdateProfile);
    
    //Obtenir la liste des commandes de l'utilisateur. renommer isLoading en isLoadingOrders =/ de la double destructuration
    const { isLoading: isLoadingOrders, error: errorOrders, myOrders } = useSelector(state => state.myOrdersList)

    useEffect(() => {
        //Si l'utilisateur n'est pas connecté, il sera redirigé vers la page de connexion
        if(!userInfo){ 
            history.push('/login')
        } else {
            if(!user.name){
                dispatch(getUserDetails('profile'));
                dispatch(getMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault(); 
        if(password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
            dispatch(updateUserProfile({ id: user.id, name, email, password }))
        }
    }

    return (
        <div className={ isOpen ? "profile open" : "profile"}> 
        <Meta title='Profile' />
            <div className="profile-form">
                <h3>Edit Profile</h3>
                {error && <p className="error">{error}</p> }
                {message && <p className="error">{message}</p> }
                {success && <p className="success">Profile updated</p> }
                {isLoading && <p>Loading...</p> }
                <form onSubmit={submitHandler}>
                    <input type="text" name="name" placeholder="Name" 
                        value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="email" name="email" placeholder="Email"
                        value={email} onChange= {(e) => setEmail(e.target.value)} />
                    <input type="password" name="password" placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" name="confirmpassword" placeholder="Confirm password"
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button type="submit">Save Changes</button>
                </form>
            </div>
            <div className="my-orders">
                <h3>My Orders</h3>
                {isLoadingOrders ? <p>Loading...</p> : 
                    errorOrders ? <p> {errorOrders} </p> :
                (
                    <div style={{ overflowX: "auto" }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {myOrders.map(order => (
                                    <tr key={order._id}> 
                                        <td> {order._id} </td>
                                        <td> {order.createdAt.substring(0,10)} </td>
                                        <td> {order.totalPrice} </td>
                                        <td> {order.isPaid ? order.paidAt.substring(0,10) : 'Not paid'} </td>
                                        <td> {order.isDelivered ? order.deliveredAt.substring(0,10) : 'Not delivered'} </td>
                                        <td> <Link to={`/order/${order._id}`}> Details </Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
