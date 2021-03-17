import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register as registerAction }  from '../actions/userActions'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Meta from '../components/Meta'
import Loading from '../components/Loading'

const RegisterPage = ({isOpen}) => {
    const dispatch = useDispatch();
    const history= useHistory(); 

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    
    const { register, handleSubmit, errors } = useForm({ mode: 'onSubmit', reValidateMode: 'onBlur' });

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

    const submitHandler = () => {
        if(password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
            dispatch(registerAction(name, email, password))
        }
    }

    return (
        <div className={isOpen ? "register-page open" : "register-page"}> 
        <Meta title='Register' />
            <div className="register-form">
                <h3>Sign Up</h3>
                {error && <p className="error">{error}</p> }
                {message && <p className="error">{message}</p> }
                {isLoading && <Loading /> }
                <form onSubmit={handleSubmit(submitHandler)}>
                    <input type="text" name="name" placeholder="Name" 
                        value={name} onChange={(e) => setName(e.target.value)} ref={register({
                            required: "Name is required",
                            minLength: {
                                value: 2,
                                message: "Can't be shorter than 2 characters"
                            },
                            maxLength: {
                                value: 20,
                                message: "Can't be longer than 20 characters"
                            },
                            pattern: { 
                                value: /^[a-zA-Z\s]*$/,
                                message: "Only letters are allowed"
                            }
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
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="sign-up-link">
                <p>Have an account ? 
                    <Link to='/login'> Login </Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage
