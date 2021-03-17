import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile }  from '../actions/userActions'
import { getMyOrders } from '../actions/orderActions'
import { useHistory, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Meta from '../components/Meta'
import Loading from '../components/Loading'

const Profile = ({ isOpen }) => {
    const dispatch = useDispatch();
    const history= useHistory(); 

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    

    const { register, handleSubmit, errors } = useForm({ mode: 'onSubmit', reValidateMode: 'onBlur' });


    //userInfo ici (différent du userInfo du Login) est créé uniquement si l'inscription a reussi
    const { isLoading, error, user } = useSelector(state => state.userDetails);

    //Pour pouvoir rediriger s'il est déjà en ligne on va vérifier l'existence du userInfo dans userLogin
    const { userInfo } = useSelector(state => state.userLogin);    

    //Pour pouvoir rediriger s'il est déjà en ligne on va vérifier l'existence du userInfo dans userLogin
    // const { success } = useSelector(state => state.userUpdateProfile);
    
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

    const submitHandler = () => {
        if(password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
            dispatch(updateUserProfile({ id: user.id, name, email, password }))
            toast.info('Profile Updated !')
        }
    }

    return (
        <div className={ isOpen ? "profile open" : "profile"}> 
        <Meta title='Profile' />
            <div className="profile-form">
                <h3>Edit Profile</h3>
                {message && <p className="error">{message}</p> }
                {isLoading ? (
                    <Loading />
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : (
                <form onSubmit={ handleSubmit(submitHandler)}>
                    <input type="text" name="name" placeholder="Name" 
                        value={name} onChange={(e) => setName(e.target.value)} ref={register({
                            required: "Name is required",
                            minLength: { value: 2, message: "Can't be shorter than 2 characters"},
                            maxLength: { value: 20, message: "Can't be longer than 20 characters"},
                            pattern: { value: /^[a-zA-Z\s]*$/, message: "Only letters are allowed"}
                        })}/>
                        {errors.name && <p className="error"> {errors.name.message} </p>}
                    <input type="email" name="email" placeholder="Email"
                        value={email} onChange= {(e) => setEmail(e.target.value)} ref={register({
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Enter a valid e-mail address",
                            }
                        })}/>
                        {errors.email && <p className="error"> {errors.email.message} </p>}
                    <input type="password" name="password" placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} ref={register({
                            required: "Password is required",
                            minLength: { value: 6, message: "Password should be at least 6 characters" }
                        })}/>
                        {errors.password && <p className="error"> {errors.password.message} </p>}
                    <input type="password" name="confirmpassword" placeholder="Confirm password"
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} ref={register({
                            required: "Please confirm your password",
                            minLength: { value: 6, message: "Password should be at least 6 characters" }
                        })}/>
                        {errors.confirmPassword && <p className="error"> {errors.confirmPassword.message} </p>}
                    <button type="submit">Save Changes</button>
                </form>)}
            </div>
            <div className="my-orders">
                <h3>My Orders</h3>
                { isLoadingOrders ? <Loading /> : 
                    errorOrders ? <p> {errorOrders} </p> :
                (<div style={{ overflowX: "auto" }}>
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
                                {myOrders && myOrders.map(order => (
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
