import { Routes, Route, Link, Outlet } from "react-router-dom";
import React, { useCallback, useState, useEffect, useMemo } from 'react';

function Locations(props) {

    return (
        <>
        <p>This is where we put the location browsing view showing a bunch of locations</p>
        <Outlet />
        </>
    );
  }
  export default Locations