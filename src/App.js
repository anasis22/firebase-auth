import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import SignUp from './SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgetPassword from './ForgetPassword'
import UpdateProfile from './UpdateProfile'


// export const AppContext = React.createContext()

const App = () => {


  return (
    <div className='mainContainer'>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path='/' Component={Dashboard} />
              <Route path='/UpdateProfile' Component={UpdateProfile} />
            </Route>
            <Route path='/signup' Component={SignUp} />
            <Route path='/login' Component={Login} />
            <Route path='/ForgetPassword' Component={ForgetPassword} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
