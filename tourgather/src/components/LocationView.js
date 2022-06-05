import { Routes, Route, Link, useParams } from "react-router-dom";
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import firebaseApp from "../firebase";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc, arrayUnion, arrayRemove  } from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

function LocationView(props) {

    let { locationId } = useParams();

    const [locationData, setLocationData]=useState({
        name: "",
        description: "",
        coordinates: {
            _lat: "",
            _long: "",
        },
        images: [],
    })

    const fetchLocation=async()=>{
        console.log(locationId)

        const docRef = doc(db, "TourGatherLOCATIONS", locationId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setLocationData(docSnap.data())
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
    }

    useEffect(() => {
        fetchLocation();
    }, []) 

    return (
        <>
        <p>This is where we put the location view</p>
        <p>Location id: {locationId}</p>

        <div className="form-group multi-preview">
          {(locationData.images || []).map((url) => (
            <img src={url} alt="..." />
          ))}
        </div>

        <p>Location: {locationData.name} </p>
        <p>Description: {locationData.description} </p>
        <p>Coordinates: {locationData.coordinates._lat.toString()}, {locationData.coordinates._long.toString()} </p>

        </>
    );
  }
  export default LocationView