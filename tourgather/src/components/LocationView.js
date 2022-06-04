import { Routes, Route, Link, useParams } from "react-router-dom";
import React, { useCallback, useState, useEffect, useMemo } from 'react';

function LocationView(props) {

    let { locationId } = useParams();

    
    return (
        <>
        <p>This is where we put the location view</p>
        <p>Location id: {locationId}</p>

        </>
    );
  }
  export default LocationView