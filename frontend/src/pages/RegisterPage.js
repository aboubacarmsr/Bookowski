import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register }  from '../actions/userActions'
import { Link, useHistory } from 'react-router-dom'
import Meta from '../components/Meta'

const RegisterPage = ({isOpen}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    
    const dispatch = useDispatch();
    const history= useHistory(); 

    // Nécéssaire si valeur facultative redirect passée dans l'url pour ensuite history.push(redirect). Ici useless
    // const location = useLocation();
    // const redirect = location.search ? location.search.split('=')[1] : '/';

    //userInfo ici (différent du userInfo du Login) est créé uniquement si l'inscription a reussi
    const { isLoading, error, userInfo } = useSelector(state => state.userRegister);

    //Pour pouvoir rediriger s'il est déjà en ligne on va vérifier l'existence du userInfo dans userLogin
    const isOnline = useSelector(state => state.userLogin.userInfo);    

    useEffect(() => {
        //Si l'utilisateur est déjà connecté, il sera redirigé automatiquement vers le home '/'
        if(userInfo || isOnline){ 
            history.push('/')
        }
    }, [history, userInfo, isOnline])

    const submitHandler = (e) => {
        e.preventDefault(); 
        if(password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <div className={isOpen ? "register-page open" : "register-page"}> 
        <Meta title='Register' />
            <div className="register-form">
                <h3>Sign Up</h3>
                {error && <p className="error">{error}</p> }
                {message && <p className="error">{message}</p> }
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
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="sign-up-link">
                <p>Have an account ? 
                    <Link to='/login'> Login </Link>
                    {/* <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}> Login </Link> */}
                </p>
            </div>
        </div>
    )
}

export default RegisterPage
