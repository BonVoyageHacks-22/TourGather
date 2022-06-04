import { Rating, InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import guides from '../guides.json';
import "./guides.css";

export const Guides = () => {
    const navigate = useNavigate();
    const icon =
        "https://icons-for-free.com/download-icon-human+person+user+icon-1320196276306824343_512.png";

    return (
        <>
            <TextField
                id="searchbar"
                label="Search"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
                style={{ marginBottom: "20px", width: "500px" }}
            />
            <br />
            {guides.map((guide) => (
                <>
                    <div id="container" onClick={() => navigate(`../profile/${guide.id}`)}>
                        <img
                            id="profilePic"
                            alt="Profile"
                            src={guide.imgURL === "-" ? icon : guide.imgURL}
                        />
                        <div id="userDetails">
                            <p>Name: {guide.name}</p>
                            <p>
                                Rating:
                                <Rating
                                    name="simple-controlled"
                                    value={guide.rating}
                                    precision={0.1}
                                />
                            </p>
                            <p>Bio: {guide.bio}</p>
                        </div>
                    </div>
                    <br />
                </>
            ))}
        </>
    );
};
