import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login }  from '../actions/userActions'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Meta from '../components/Meta'
import Loading from '../components/Loading'

const LoginPage = ({ isOpen }) => {
    const dispatch = useDispatch();
    const history= useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { register, handleSubmit, errors } = useForm({ mode: 'onSubmit', reValidateMode: 'onBlur' });

    const { isLoading, error, userInfo } = useSelector(state => state.userLogin);

    useEffect(() => {
        //userInfo ici est créé uniquement si la connexion a reussi
        //Si l'utilisateur est connecté, se diriger vers /login le ramenera automatiquement vers le home '/'
        if(userInfo){
            history.push('/')
            toast.success(`Glad to see you again, ${userInfo.name} !`)
        }
    }, [history, userInfo])

    const submitHandler = () => {
        dispatch(login(email, password))
    }
    

    return (
        <div className={ isOpen ? "login-page open" : "login-page"}> 
        <Meta title='Login' />
            <div className="login-form">
                <h3>Sign In</h3>
                {error && <p className="error">{error}</p> }
                {isLoading && <Loading /> }
                <form onSubmit={handleSubmit(submitHandler)}>
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
                        {errors.password && <p className="error"> {errors.password.message} </p> }
                    <button type="submit">Sign In</button>
                </form>
            </div> 
            <div className="sign-in-link">
                <p>First time here ? 
                    <Link to='/register'> Create an account </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage
