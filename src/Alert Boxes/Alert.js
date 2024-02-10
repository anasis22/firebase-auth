import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Alert = () => {

const {currentUser} = useAuth()

  return (
    <div className='alertBox'>
      {`Already logged as ${currentUser.email} `}
    </div>
  )
}

export default Alert
