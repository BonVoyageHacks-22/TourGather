import {
    Card,
    Button,
    Rating,
    TextField,
    FormHelperText,
    FormControl
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import firebaseApp from "../firebase.js";
import "./Profile.css";
import guides from "../guides.json";

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


export const EditProfile = () => {
    const id = window.location.pathname
        .replace("/profile/", "")
        .replace("/edit", "");
    const user = guides.filter((guide) => guide.id === parseInt(id))[0];
    const icon =
        "https://icons-for-free.com/download-icon-human+person+user+icon-1320196276306824343_512.png";

    async function handleSubmit(e) {
        console.log(e)
        console.log(e.target.value)
        e.preventDefault();
    }

    console.log(window.location.pathname.toString())

    return (
        <>
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
                    <FormControl
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                        }}
                        onSubmit={handleSubmit}
                    >
                    <div id="userDetails">
                        <img
                            id="profilePic"
                            alt="Profile"
                            src={user.imgURL === "-" ? icon : user.imgURL}
                        />
                        <span id="spacer"/>
                        <input type="file" accept="image/*"/>
                    </div>
                        
                        <div id="userDetails">
                            <TextField
                                required
                                autoFocus
                                fullWidth
                                label="Name"
                                defaultValue={user.name}
                            />
                            <span id="spacer" />
                            <FormHelperText>Rating</FormHelperText>
                            <Rating
                                name="simple-controlled"
                                disabled
                                value={user.rating}
                                precision={0.1}
                            />
                            <span id="spacer" />
                            <TextField
                                required
                                fullWidth
                                label="Email"
                                defaultValue={user.email}
                            />
                            <span id="spacer" />
                            <TextField
                                fullWidth
                                label="Bio"
                                defaultValue={user.bio}
                            />
                            <span id="spacer" />
                            <input type="submit" value="Submit" id="submitBtn" style={{backgroundColor: "#4eb398"}}/>
                        </div>
                    </FormControl>
                ) : (
                    <p>No user found</p>
                )}
            </Card>
        </>
    );
};
