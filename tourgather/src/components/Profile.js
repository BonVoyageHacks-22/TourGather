import { Card, Button, Rating } from "@mui/material";
import { ChevronLeft, Edit } from "@mui/icons-material";

import "./Profile.css";
import guides from "../guides.json";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const navigate = useNavigate();
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
            <Card id="bigContainer">
                {user !== undefined ? (
                    <>
                        <img
                            id="profilePic"
                            alt="Profile"
                            src={user.imgURL === "-" ? icon : user.imgURL}
                        />
                        <div id="userDetails">
                            <Button
                                id="editBtn"
                                variant="invert"
                                sx={{ color: "#a75aa3" }}
                                startIcon={<Edit />}
                                onClick={() => navigate(`${window.location.pathname}/edit`)}
                            >
                                Edit
                            </Button>
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