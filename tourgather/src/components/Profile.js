import { useState, useEffect } from "react";
import { Card, Button, Rating, Chip } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { getFirestore, getDoc, doc } from "firebase/firestore";

import "./Profile.css";
import firebaseApp from "../firebase";

const db = getFirestore(firebaseApp);

export const Profile = () => {
    const id = window.location.pathname.replace("/profile/", "");
    const [user, setUser] = useState();
    const [locations, setLocations] = useState([]);
    const icon =
        "https://icons-for-free.com/download-icon-human+person+user+icon-1320196276306824343_512.png";

    useEffect(() => {
        async function fetchProfile() {
            const docRef = doc(db, "TourGatherGUIDES", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUser(docSnap.data());
            } else {
                console.log("No such user!");
            }
        }

        async function fetchLocations() {
            if (user !== undefined) {
                let locationsArray = [...user.location];

                if (user.location[0] !== "") {
                    for (let i = 0; i < locationsArray.length; i++) {
                        let id = locationsArray[i].id;
                        const docRef = doc(db, "TourGatherGUIDES", id);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            let info = { name: docSnap.data().name, id: id };
                            setLocations([...locations, info]);
                        } else {
                            console.log("No such user!");
                        }
                    }
                }console.log(locationsArray)
            }
            
        }

        fetchProfile();
        fetchLocations();
    }, []);

    const handleOnClick = (e) => {
        console.log(e)
    }

    return (
        <div style={{ marginTop: "10px" }}>
            <Button
                id="backBtn"
                startIcon={<ChevronLeft />}
                sx={{ color: "#a75aa3" }}
                onClick={() => window.history.back()}
            >
                Back
            </Button>
            <Card id="bigContainer">
                {user !== undefined ? (
                    <>
                        <img
                            id="profilePic"
                            alt="Profile"
                            src={user.imgURL === "" ? icon : user.imgURL}
                        />
                        <div id="userDetails">
                            <p>Name: {user.name}</p>
                            <p>
                                Rating:
                                <Rating
                                    name="simple-controlled"
                                    value={user.rating}
                                    precision={0.1}
                                />
                            </p>
                            <p>Email: {user.email}</p>
                            <p>Bio: {user.bio === "" ? " -" : user.bio}</p>
                            <p>
                                Locations:
                                {locations.length >= 1
                                    ? locations.map((location) => (
                                          <Chip
                                              id={location.id}
                                              label={location.name}
                                              onClick={handleOnClick}
                                          />
                                      ))
                                    : " -"}
                            </p>
                        </div>
                    </>
                ) : (
                    <p>No user found</p>
                )}
            </Card>
        </div>
    );
};
