import React, { useContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut , updateEmail , updatePassword} from "firebase/auth"
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function updateUserEmail(email){
        return updateEmail(auth.currentUser,email)
    }

    function updateUserPassword(password){
        return updatePassword(auth.currentUser,password)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth,email)
    }

   function logout() {
        return signOut(auth)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth,email,password)
    }

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth,email,password)
    }

    useEffect(() => {
        const unsubscriber = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        }, [])

        return unsubscriber
    })

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateUserEmail,
        updateUserPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}