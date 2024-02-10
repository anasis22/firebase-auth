
import { Link } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'


const Dashboard = () => {

const {currentUser,logout} = useAuth()

async function handleLogout(){
  
  try{
    await logout()
  }catch(error){
    console.log(error);
  }
}

  return (
    <div className='Dashboard'>
      <div className='profile'>
         <h1 className='profileHead'>Profile</h1>
         <span><strong>Email:</strong>{currentUser ? currentUser.email : 'not record found' }</span>
         <Link className='update-profile' to='/UpdateProfile'>Update Profile</Link>
      </div>
      <Link className='logout' to='/login' onClick={handleLogout}>Log Out</Link>
    </div>
  )
}

export default Dashboard
