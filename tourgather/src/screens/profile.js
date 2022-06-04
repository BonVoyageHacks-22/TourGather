import { Card, Button, Rating } from "@mui/material";
import { ChevronLeft, Edit } from "@mui/icons-material";

import "./profile.css";
import guides from "../guides.json";

export const Profile = () => {
    const id = window.location.pathname.replace("/profile/", "");
    const user = guides.filter((guide) => guide.id === parseInt(id))[0];
    const icon =
        "https://icons-for-free.com/download-icon-human+person+user+icon-1320196276306824343_512.png";

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
            <Card sx={{ backgroundColor: "#faf8e9" }} id="bigContainer">
                {user !== undefined ? (
                    <>
                        <img
                            id="profilePic"
                            alt="Profile"
                            src={user.imgURL === "-" ? icon : user.imgURL}
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
                            <p>Bio: {user.bio}</p>
                        </div>
                    </>
                ) : (
                    <p>No user found</p>
                )}
            </Card>
        </>
    );
};
