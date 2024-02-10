import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from './Alert Boxes/Alert'
import { useAuth } from './contexts/AuthContext'
import UserNotFoundAlert from './Alert Boxes/UserNotFoundAlert'
import WrongPassword from './Alert Boxes/WrongPassword'

const Login = () => {


    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [userNone, setUserNone] = useState(false)
    const [wrongPassword, setWrongPassword] = useState(false)
    

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            setUserNone(false)
            setWrongPassword(false)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch (error) {
            console.log(error.code);
            error.code == 'auth/user-not-found' && setUserNone(true)
            error.code == 'auth/wrong-password' && setWrongPassword(true)
        }

        emailRef.current.value = ''
        passwordRef.current.value = ''

        setLoading(false)

    }

    return (
        <div className='pageWrappper'>
            <form className='LoginPage' onSubmit={handleSubmit}>
                <h3>Log In</h3>
                {currentUser && <Alert />}
                {error && 'Failed to login'}
                {userNone && <UserNotFoundAlert />}
                {wrongPassword && <WrongPassword />}
                <label>Email</label>
                <input type='email' ref={emailRef} required></input>


                <label>Password</label>
                <input type='password' ref={passwordRef} required></input>


                <button type='submit' disabled={loading}>Log In</button>
                <Link className='ForgetPassword' to='/ForgetPassword'>Forget Password?</Link>
            </form>
            <div className='already'>Need an account? <Link className='toSignUp' to='/signup'>Sign Up</Link></div>
        </div>
    )
}

export default Login
