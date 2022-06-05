import React, { useCallback, useState, useEffect, useMemo } from "react";
import firebaseApp from "../firebase";


import { getAuth, onAuthStateChanged } from "firebase/auth";


function LocationNotFound(props) {
  return (
    <>
      <p>Location not found</p>
    </>
  );
}
export default LocationNotFound;
