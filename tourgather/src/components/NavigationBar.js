import { Routes, Route, Link } from "react-router-dom";
import React, { useCallback, useState, useEffect, useMemo } from 'react';

function NavigationBar(props) {

    return (
        <>
        <p>This is where we put the location browsing view showing a bunch of locations</p>
        <nav>
          <li>
          <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/location">Browse Locations</Link>
          </li>
          <li>
            <Link to="/location/WgQT2eAjaWlq2APFje4I">Location View</Link>
          </li>
          <li>
            <Link to="/location/WgQT2eAjaWlq2APFje4I/edit">Location Edit</Link>
          </li>
          <li>
            <Link to="/location/new">Location New</Link>
          </li>
        </nav>
        </>
    );
  }
  export default NavigationBar