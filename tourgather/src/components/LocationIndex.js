import { Routes, Route, Link, useParams } from "react-router-dom";
import React, { useCallback, useState, useEffect, useMemo } from "react";
import firebaseApp from "../firebase";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  orderBy,
  startAt,
  endAt,
  limit,
  startAfter,
} from "firebase/firestore";
import { Button } from "@mui/material";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import BrowseLocationCard from "./BrowseLocationCard";

import "./LocationIndex.css";

import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

const db = getFirestore(firebaseApp);

function LocationIndex(props) {
  const [cursor, setCursor] = useState(0);

  const [locationData, setLocationData] = useState({
    documentSnapshots: [],
    next: [],
  });

  const fetchLocations = async () => {
    // Query the first page of docs
    const first = query(
      collection(db, "TourGatherLOCATIONS"),
      orderBy("name"),
      limit(25)
    );
    const documentSnapshots = await getDocs(first);

    console.log("documentSnapshots:", documentSnapshots);

    // Get the last visible document
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    console.log("last", lastVisible);
    console.log(lastVisible.data());

    // Construct a new query starting at this document,
    // get the next 25 cities.
    const next = query(
      collection(db, "TourGatherLOCATIONS"),
      orderBy("name"),
      startAfter(lastVisible),
      limit(25)
    );

    setLocationData({
      documentSnapshots: documentSnapshots,
      next: next,
    });
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <>
      <div className="index-header">
        <h1>Browse Locations</h1>
        <p> Click on a location to see more information </p>
        <Link to={`/location/new`}>
          <Button
            sx={{ backgroundColor: "#A75AA3", color: "white", textDecoration: "none" }}
            variant="contained"
            endIcon={<AddLocationAltIcon />}
          >
            Add Location
          </Button>
        </Link>
      </div>

      <div className="locations-browsing-area">
        {(locationData.documentSnapshots.docs || []).map((doc) => {
          return <BrowseLocationCard doc={doc} />;
        })}
      </div>
    </>
  );
}
export default LocationIndex;
