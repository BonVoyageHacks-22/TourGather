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

import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      <p>This the index page content for the locations</p>

      <hr />
      
      <div className="form-group multi-preview">
          {(locationData.documentSnapshots.docs || []).map((doc) => {
            return (
              <div key={doc.id}>
                              <img src={doc.data().images[0]} alt="..." />
            <p>Location: {doc.data().name} </p>
            <p>Description: {doc.data().description} </p>
            <p>Coordinates: {doc.data().coordinates._lat.toString()}, {doc.data().coordinates._long.toString()} </p>
    
                <Link to={`/location/${doc.id}`}>
                  <p>{doc.data().name}</p>
                </Link>
              </div>
            );
          })}
        </div>
    </>
  );
}
export default LocationIndex;
