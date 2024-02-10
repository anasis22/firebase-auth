import React, { useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Alert from './Alert Boxes/Alert'
import { useAuth } from './contexts/AuthContext'
import FailedToResetPassword from './Alert Boxes/FailedToResetPassword'
import IfEmailCorrect from './Alert Boxes/IfEmailCorrect'
 

const ForgetPassword = () => {


    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [loading, setLoading] = useState(false)
    const [checkEmail,setCheckEmail] = useState(false)
    const [ifEmail,setIfEmail] = useState(false)
    
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setCheckEmail(false)
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setIfEmail(true)
        }catch(error){
            console.log(error.code);
            error.code == 'auth/user-not-found' && setCheckEmail(true)
        }

        emailRef.current.value = ''

        setLoading(false)
       

    }

    return (
        <div className='pageWrappper'>
            <form className='LoginPage' onSubmit={handleSubmit}>
                <h3>Password Reset</h3>
                {checkEmail && <FailedToResetPassword />}
                {ifEmail && <IfEmailCorrect />}
                <label>Email</label>
                <input type='email' ref={emailRef} required></input>

                <button type='submit' disabled={loading}>Reset Password</button>
                <Link className='ForgetPassword' to='/login'>Log In</Link>
            </form>
            <div className='already'>Need an account? <Link to='/signup'>Sign Up</Link></div>
        </div>
    )
}

export default ForgetPassword
