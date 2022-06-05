import { useState } from "react";
import { Rating, InputAdornment, TextField, Card } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import guides from "../guides.json";
import "./guides.css";

export const Guides = () => {
    const navigate = useNavigate();
    const [tourGuides, setTourGuides] = useState(guides);
    const icon =
        "https://icons-for-free.com/download-icon-human+person+user+icon-1320196276306824343_512.png";

    function search(e) {
        let input = e.target.value;

        if (input === "") {
            setTourGuides(guides);
        } else {
            setTourGuides(
                guides.filter((guide) =>
                    Object.keys(guide).some((key) =>
                        guide[key].toString().includes(input)
                    )
                )
            );
        }
    }

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
                onInput={search}
            />
            <br />
            {tourGuides.map((guide) => (
                <div key={guide.id}>
                    <Card
                        id="container"
                        onClick={() => navigate(`../profile/${guide.id}`)}
                    >
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
                    </Card>
                    <br />
                </div>
            ))}
        </>
    );
};
