import { Routes, Route, Link, useParams } from "react-router-dom";
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import firebaseApp from "../firebase";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc, arrayUnion, arrayRemove  } from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

function LocationView(props) {

    let { locationId } = useParams();

    const [locationData, setLocationData]=useState([])

    const fetchBlogs=async()=>{
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
        fetchBlogs();
    }, []) 

    return (
        <>
        <p>This is where we put the location view</p>
        <p>Location id: {locationId}</p>

        <p>Location: {locationData.name} </p>
        <p>Description: {locationData.description} </p>
        <p>Coordinates: {locationData.coordinates._lat.toString()}, {locationData.coordinates._long.toString()} </p>

        </>
    );
  }
  export default LocationView