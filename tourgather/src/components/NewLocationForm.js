import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useCallback, useState, useEffect, useMemo } from "react";
import {
  FormControl,
  TextField,
  Input,
  FilledInput,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import firebaseApp from "../firebase";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "./NewLocationForm.css";

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

function NewLocationForm(props) {
  const navigate = useNavigate();

  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: "",
  });

  const nameInput = React.useRef(null);
  const descriptionInput = React.useRef(null);
  const coordinatesInputLat = React.useRef(null);
  const coordinatesInputLong = React.useRef(null);

  const [files, setFiles] = useState({
    fileArray: [],
    fileObj: [],
    name: "",
    description: "",
    coordinates: {
      _lat: "",
      _long: "",
    },
  });

  function uploadMultipleFiles(e) {
    let newFileObjArr = e.target.files;

    let newFileArrayArr = [];

    for (let i = 0; i < newFileObjArr.length; i++) {
      console.log(newFileObjArr[i]);
      newFileArrayArr.push(URL.createObjectURL(newFileObjArr[i]));
    }

    console.log(newFileObjArr);
    console.log(newFileArrayArr);

    setFiles((previousValues) => ({
      ...previousValues,
      fileArray: newFileArrayArr,
      fileObj: newFileObjArr,
    }));
  }

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  async function uploadFiles(e) {
    // create the new location doc
    if (files.name === "") {
      setAlertInfo({
        open: true,
        message: "Please enter a name for the location",
      });

      return;
    }

    if (files.name.length > 120) {
      setAlertInfo({
        open: true,
        message: "Location name must be less than 120 characters",
      });

      return;
    }

    if (files.coordinates._lat === "") {
      setAlertInfo({
        open: true,
        message: "Please enter a latitude for the location",
      });

      return;
    }

    // if (isNaN(files.coordinates._lat)) {
    //   setAlertInfo({
    //     open: true,
    //     message: "Please enter a valid latitude for the location",
    //   });

    //   return;
    // }

    // if (isNaN(files.coordinates._long)) {
    //     setAlertInfo({
    //       open: true,
    //       message: "Please enter a valid longitude for the location",
    //     });
  
    //     return;
    //   }

    if (files.coordinates._long === "") {
      setAlertInfo({
        open: true,
        message: "Please enter a longitude for the location",
      });

      return;
    }

    if (files.description === "") {
      setAlertInfo({
        open: true,
        message: "Please enter a description for the location",
      });

      return;
    }

    if (files.fileObj.length === 0) {
      setAlertInfo({
        open: true,
        message: "Please select at least one file to upload",
      });

      return;
    }

    const docRef = await addDoc(collection(db, "TourGatherLOCATIONS"), {
      name: files.name,
      description: files.description,
      coordinates: {
        _lat: files.coordinates._lat,
        _long: files.coordinates._long,
      },
      images: [],
      guides: [],
    });
    console.log(docRef);

    // 'file' comes from the Blob or File API
    for (let i = 0; i < files.fileObj.length; i++) {
      // Get the ref
      var filePath =
        "TourGather/Locations/" +
        docRef.id.toString() +
        "/" +
        files.fileObj[i].name;
      console.log(filePath);
      const storageRef = ref(storage, filePath.toString());

      const uploadTask = uploadBytes(storageRef, files.fileObj[i])
        .then(
          // eslint-disable-next-line no-loop-func
          (snapshot) => {
            console.log("Upload is complete");
            console.log(snapshot);

            getDownloadURL(storageRef).then((url) =>
              // update the location doc with the image url
              updateDoc(docRef, {
                images: arrayUnion(url),
              })
            );
          },
          (error) => {
            console.log(error);
          }
        )
        .then(() => {
            // buy time for firebase storage to refresh
          delay(500).then(() => {
            if (i === files.fileObj.length - 1) {
              console.log("done");

              navigate("/location/" + docRef.id);
            }
          });
        });
    }

    // nameInput.current.value = "";
    // descriptionInput.current.value = "";
    // coordinatesInputLat.current.value = "";
    // coordinatesInputLong.current.value = "";

    // setFiles({
    //   fileArray: [],
    //   fileObj: [],
    //   name: "",
    //   description: "",
    //   coordinates: {
    //     _lat: "",
    //     _long: "",
    //   },
    // });

    e.preventDefault();
    console.log(files);
  }

  return (
    <>
      <p>Add the information about your new location here!</p>

      <FormControl>
        {alertInfo.open ? (
          <Stack sx={{ width: "100%", display: "flex" }} spacing={2}>
            <Alert variant="filled" severity="error">
              {alertInfo.message}
            </Alert>
            <br></br>
          </Stack>
        ) : null}

        <TextField
          required
          id="standard-helperText"
          label="Location"
          //   defaultValue="Botanic Gardens"
          helperText="Common location name"
          variant="standard"
          inputRef={nameInput}
          value={files.name}
          onChange={(e) => {
            setFiles((previousValues) => ({
              ...previousValues,
              name: e.target.value,
            }));
          }}
        />

        <br></br>

        <TextField
          required
          id="filled-number"
          label="Latitude"
          type="number"
          inputRef={coordinatesInputLat}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: -90, max: 90 } }}
          variant="filled"
          value={files.coordinates._lat}
          onChange={(e) => {
            if (e.target.value > 90 || e.target.value < -90) {
              e.target.value = "";
            } else {
              setFiles((previousValues) => ({
                ...previousValues,
                coordinates: {
                  ...previousValues.coordinates,
                  _lat: e.target.value,
                },
              }));
            }
          }}
        />
        <TextField
          required
          id="filled-number"
          label="Longitude"
          type="number"
          inputRef={coordinatesInputLong}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: -180, max: 180 } }}
          variant="filled"
          value={files.coordinates._long}
          onChange={(e) => {
            if (e.target.value > 180 || e.target.value < -180) {
              e.target.value = "";
            } else {
              setFiles((previousValues) => ({
                ...previousValues,
                coordinates: {
                  ...previousValues.coordinates,
                  _long: e.target.value,
                },
              }));
            }
          }}
        />

        <br></br>

        <TextField
          required
          id="standard-multiline-static"
          label="Location Description"
          multiline
          inputRef={descriptionInput}
          rows={4}
          //   defaultValue="Location Description"
          variant="standard"
          value={files.description}
          onChange={(e) => {
            setFiles((previousValues) => ({
              ...previousValues,
              description: e.target.value,
            }));
          }}
        />
        <FormHelperText id="my-helper-text">
          Give a brief description of the location
        </FormHelperText>

        <br></br>

        <Button
          style={{
            borderRadius: 34,
            backgroundColor: "#4EB398",
            padding: "10px 36px",
            margin: "10px 0px",
            // color: "#131313"
          }}
          variant="contained"
          component="label"
        >
          Select Images
          <input
            type="file"
            hidden
            className="form-control"
            onChange={uploadMultipleFiles}
            multiple
          />
        </Button>

        <div className="form-group multi-preview">
          {(files.fileArray || []).map((url) => (
            <img src={url} alt="..." />
          ))}
        </div>

        <br></br>

        <Button
          style={{ borderRadius: 34, backgroundColor: "#A75AA3" }}
          variant="contained"
          onClick={() => {
            uploadFiles();
          }}
        >
          Submit
        </Button>
      </FormControl>
    </>
  );
}
export default NewLocationForm;
