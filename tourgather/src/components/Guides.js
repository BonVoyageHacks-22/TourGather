import { useEffect, useState } from "react";
import { Rating, InputAdornment, TextField, Card } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import "./Guides.css";
import firebaseApp from "../firebase";

const db = getFirestore(firebaseApp);

export const Guides = () => {
    const navigate = useNavigate();
    const [tourGuides, setTourGuides] = useState([]);
    const icon =
        "https://icons-for-free.com/download-icon-human+person+user+icon-1320196276306824343_512.png";
    let results = [];

    useEffect(() => {
        async function fetchTourGuides() {
            const response = await getDocs(collection(db, "TourGatherGUIDES"));
            response.forEach((item) => {
                let tourGuide = { ...item.data(), id: item.id };
                if (!results.includes(item.id))
                    results.push(tourGuide)
            });

            setTourGuides(results);
        }

        fetchTourGuides();
    }, []);

    /*     function search(e) {
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
    } */

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
                style={{
                    marginTop: "10px",
                    marginBottom: "20px",
                    width: "500px",
                }}
                //onInput={search}
            />
            <br />
            {tourGuides.length >= 1
                ? tourGuides.map((guide) => (
                      <div key={guide.id}>
                          <Card
                              key={guide.id}
                              id="container"
                              onClick={() => navigate(`../profile/${guide.id}`)}
                          >
                              <img
                                  id="profilePic"
                                  alt="Profile"
                                  src={
                                      guide.imgURL === "" ? icon : guide.imgURL.toString()
                                  }
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
                  ))
                : null}
        </>
    );
};
