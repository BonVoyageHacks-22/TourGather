import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
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
  where,
} from "firebase/firestore";

import ImageGallery from "react-image-gallery";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import "./LocationView.css";

const db = getFirestore(firebaseApp);

function LocationView(props) {
  const navigate = useNavigate();

  let { locationId } = useParams();

  const [locationData, setLocationData] = useState({
    name: "",
    description: "",
    coordinates: {
      _lat: "",
      _long: "",
    },
    images: [],
    galleryImages: [],
    guides: [],
  });

  const fetchLocation = async () => {
    console.log(locationId);

    const docRef = doc(db, "TourGatherLOCATIONS", locationId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      const guidesRef = collection(db, "TourGatherGUIDES");

      const locationTag = "/TourGatherGUIDES/" + locationId;
      console.log(locationTag);

      const guidesQuery = await query(
        guidesRef,
        where("location", "array-contains", locationTag)
      );
      const querySnapshot = await getDocs(guidesQuery);

      var guides = [];

      querySnapshot.forEach((doc) => {
        console.log(doc.data());

        var guide = {
          id: doc.id,
          ...doc.data(),
        };

        console.log(doc.id, " => ", doc.data());
        guides.push(guide);
      });

      var imagesTemp = docSnap.data().images;
      var galleryImagesTemp = [];

      for (var i = 0; i < imagesTemp.length; i++) {
        galleryImagesTemp.push({
          original: imagesTemp[i],
          thumbnail: imagesTemp[i],
        });
      }

      setLocationData({
        name: docSnap.data().name,
        description: docSnap.data().description,
        coordinates: docSnap.data().coordinates,
        images: docSnap.data().images,
        galleryImages: galleryImagesTemp,
        guides: guides,
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      navigate("/location/" + docRef.id);
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
      <div className="main-view-container">
        <h1>{locationData.name}</h1>

        <div className="location-view-container">
          <ImageGallery
            showFullscreenButton={false}
            items={locationData.galleryImages}
            showNav={false}
          />
        </div>

        {/* <div className="multi-preview">
          {(locationData.images || []).map((url) => (
            <img src={url} alt="..." />
          ))}
        </div> */}

        <p className="description-text">Description: {locationData.description} </p>

        <p>
          Coordinates: {locationData.coordinates._lat.toString()},{" "}
          {locationData.coordinates._long.toString()}{" "}
        </p>

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

        <div className="multi-preview">
          {(locationData.guides || []).map((guide) => (
            <p>
              <Link to={`/guide/${guide.id}`}>
                {guide.name} - {guide.rating}
              </Link>
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
export default LocationView;
