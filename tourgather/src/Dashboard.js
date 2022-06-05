import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "./AuthContext"
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "./AuthContext";
import { getAuth, signOut } from 'firebase/auth'

export default function Dashboard() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const { user } = AuthContext
    const auth = getAuth()
    const person = auth.currentUser

    const navigate = useNavigate()

    async function handleLogout() {
        setError("")

        try {
            signOut(auth).then(() => {
                navigate('/')
            })
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Hello!</strong> {person.displayName} <strong>👋</strong>
                    <div> <br/> </div>
                    <strong>Email:</strong> {person.email}
                    <div> <br/> </div>
                    <img src={person.photoURL} alt="photo" width="100" height="100"/>
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        </>
    )
}