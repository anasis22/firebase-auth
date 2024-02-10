import React, { useRef, useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import SignupSuccess from './Alert Boxes/SignupSuccess'

const SignUp = () => {


    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [accCreatedSuccess,setaccCreatedSuccess] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password Does not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            setaccCreatedSuccess(true)
            navigate('/')
        }catch{
            setError('Failed to create an account')
        }

        emailRef.current.value = ''
        passwordRef.current.value = ''
        passwordConfirmRef.current.value = ''

        setLoading(false)

    }

    return (
        <div className='pageWrappper'>
            <form className='LoginPage' onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                {error && alert(error)}
                {accCreatedSuccess && <SignupSuccess />}
                <label>Email</label>
                <input type='email' ref={emailRef} required></input>


                <label>Password</label>
                <input type='password' ref={passwordRef} required></input>


                <label>Password Confirmation</label>
                <input type='password' ref={passwordConfirmRef} required></input>

                <button type='submit' disabled={loading} >Sign Up</button>
            </form>
            <div className='already'>already have an account? <Link className='toLogin' to='/login'>Log In</Link></div>
        </div>
    )
}

export default SignUp
