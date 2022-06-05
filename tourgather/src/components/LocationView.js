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
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import "./LocationView.css";

const db = getFirestore(firebaseApp);

function LocationView(props) {
  let { locationId } = useParams();

  const [locationData, setLocationData] = useState({
    name: "",
    description: "",
    coordinates: {
      _lat: "",
      _long: "",
    },
    images: [],
  });

  const fetchLocation = async () => {
    console.log(locationId);

    const docRef = doc(db, "TourGatherLOCATIONS", locationId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setLocationData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

 var srcString =
    "https://maps.google.com/maps?q=" +
    locationData.coordinates._lat +
    ",%20" +
    locationData.coordinates._long +
    "&t=&z=13&ie=UTF8&iwloc=&output=embed";

  return (
    <>
      <p>This is where we put the location view</p>
      <p>Location id: {locationId}</p>

      <div class="mapouter">
        <div class="gmap_canvas">
          <iframe
            title="location-map"
            width="600"
            height="500"
            id="gmap_canvas"
            src={srcString}
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
          <a href="https://www.embedgooglemap.net/blog/divi-discount-code-elegant-themes-coupon/"></a>
          <br />
          <a href="https://www.embedgooglemap.net">google maps in website</a>
        </div>
      </div>

      <div className="form-group multi-preview">
        {(locationData.images || []).map((url) => (
          <img src={url} alt="..." />
        ))}
      </div>

      <p>Location: {locationData.name} </p>
      <p>Description: {locationData.description} </p>
      <p>
        Coordinates: {locationData.coordinates._lat.toString()},{" "}
        {locationData.coordinates._long.toString()}{" "}
      </p>
    </>
  );
}
export default LocationView;
