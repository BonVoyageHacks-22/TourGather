import React, {useContext, useEffect, useState, createContext} from 'react'
import {auth} from './firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { updateProfile } from 'firebase/auth'

const AuthContext = createContext('')

export default AuthContext

export function useAuth() {
    return useContext(AuthContext)
}

export async function upload(file, currentUser, setLoading) {
    const storage = getStorage()
    const fileRef = ref(storage, 'TourGather/ProfilePics/' + currentUser.uid + '.png')
    setLoading(true)
    const snapshot = await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef)

    await updateProfile(currentUser, {photoURL})

    setLoading(false)
    alert("uploaded file")
}


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }


    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}
