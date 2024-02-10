import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import UpdateProfilePassRefNotMatch from './Alert Boxes/UpdateProfilePassRefNotMatch'

const UpdateProfile = () => {


    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updateUserEmail, updateUserPassword } = useAuth()
    const [loading, setLoading] = useState(false)
    const [passRef, setPassRef] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        passwordRef.current.value !== passwordConfirmRef.current.value && setPassRef(true)

        const promises = []

        setLoading(true)
        emailRef.current.value !== currentUser.email && promises.push(updateUserEmail(emailRef.current.value))

        passwordRef.current.value == passwordConfirmRef.current.value && promises.push((updateUserPassword(passwordRef.current.value)))

        Promise.all(promises).then(() => {
            passwordRef.current.value == passwordConfirmRef.current.value  && navigate('/')
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
            setLoading(false)
            
        })

    }

    return (
        <div className='pageWrappper'>
            <form className='LoginPage' onSubmit={handleSubmit}>
                <h3>Profile Update</h3>
                {passRef && <UpdateProfilePassRefNotMatch />}
                <label>Email</label>
                <input type='email' ref={emailRef} required defaultValue={currentUser.email} placeholder='Email'></input>

                <label>Password</label>
                <input type='password' ref={passwordRef} placeholder='Leave it blank to keep the same'></input>

                <label>Password Confirmation</label>
                <input type='password' ref={passwordConfirmRef} placeholder='Leave it blank to keep the same'></input>

                <button type='submit' disabled={loading}>Update</button>
            </form>
            <Link className='toSignUp' to='/'>Cancel</Link>
        </div>
    )
}

export default UpdateProfile
