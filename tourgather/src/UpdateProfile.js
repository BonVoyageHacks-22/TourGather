import React, {useEffect, useRef, useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth, upload } from "./AuthContext";
import { Link } from "react-router-dom"
import {getAuth, signOut, updateProfile } from 'firebase/auth'
import {Divider} from "@mui/material";


export default function UpdateProfile() {
    const nameRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const auth = getAuth()
    const person = auth.currentUser
    const [photoURL, setPhotoURL] = useState("https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png")
    const [photo, setPhoto] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)

            if (nameRef.current.value !== "") {
                await updateProfile(auth.currentUser, {
                    displayName: nameRef.current.value,
                })
            }

        } catch {
            setError('Failed to update profile')
        }

    }

    function handleClick() {
        upload(photo, person, setLoading)
    }

    function handleChange(e) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0])
        }

    }

    useEffect(() => {
        if (person.photoURL) {
            setPhotoURL(person.photoURL)
        }
    }, [person])

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group id="displayName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="displayName" ref={nameRef} />
                            <Form.Label>Photo</Form.Label>
                        </Form.Group>
                        <Divider>
                            <input type="file" onChange={handleChange}/>
                            <Button disabled={loading || !photo} onClick={handleClick}>Upload</Button>
                            <img src={photoURL} alt="photo" width="100" height="100"/>
                        </Divider>
                        <Button disabled={loading} className="w-100" type="submit">Save</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Go back to dashboard <Link to="/dashboard">Dashboard</Link>
            </div>
        </>
    )
}