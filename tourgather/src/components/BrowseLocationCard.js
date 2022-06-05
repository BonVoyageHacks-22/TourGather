import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import "./BrowseLocationCard.css";

function BrowseLocationCard(props) {
  const navigate = useNavigate();

  function goToPage(e) {
      console.log("clicked");
    navigate(`/location/${props.doc.id}`);
  }

  return (
    <>
      <div
        key={props.doc.id}
        className="card-container"
        onClick={() => goToPage(props.doc.id)}
      >
        <img src={props.doc.data().images[0]} alt="..." />
        <h3> {props.doc.data().name} </h3>
        <p className="description">
          Description: {props.doc.data().description}{" "}
        </p>
        <p>
          Coordinates: {props.doc.data().coordinates._lat.toString()},{" "}
          {props.doc.data().coordinates._long.toString()}{" "}
        </p>

        {/* <Link to={`/location/${props.doc.id}`}>
          <p>{props.doc.data().name}</p>
        </Link> */}
      </div>
    </>
  );
}

export default BrowseLocationCard;
