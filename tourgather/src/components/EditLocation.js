import { Routes, Route, Link, useParams } from "react-router-dom";
import React, { useCallback, useState, useEffect, useMemo } from 'react';



function EditLocation(props) {

    let { locationId } = useParams();


    return (
        <>
        <p>This is where we edit location</p>
        <p>Location id: {locationId}</p>

        </>
    );
}

export default EditLocation