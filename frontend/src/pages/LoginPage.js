import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login }  from '../actions/userActions'
import { Link, useHistory } from 'react-router-dom'
import Meta from '../components/Meta'

const LoginPage = ({ isOpen }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history= useHistory();

    // const location = useLocation();
    // const redirect = location.search ? location.search.split('=')[1] : '/';

    const { isLoading, error, userInfo } = useSelector(state => state.userLogin);

    useEffect(() => {
        //userInfo ici est créé uniquement si la connexion a reussi
        //Si l'utilisateur est connecté, se diriger vers /login le ramenera automatiquement vers le home '/'
        if(userInfo){
            history.push('/')
        }
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <div className={ isOpen ? "login-page open" : "login-page"}> 
        <Meta title='Login' />
            <div className="login-form">
                <h3>Sign In</h3>
                {error && <p className="error">{error}</p> }
                {isLoading && <p>Loading...</p> }
                <form onSubmit={submitHandler}>
                    <input type="email" name="email" placeholder="Email"
                        value={email} onChange= {(e) => setEmail(e.target.value)} />
                    <input type="password" name="password" placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Sign In</button>
                </form>
            </div> 
            <div className="sign-in-link">
                <p>First time here ? 
                    <Link to='/register'> Create an account </Link>
                    {/* <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Create an account </Link> */}
                </p>
            </div>
        </div>
    )
}

export default LoginPage
