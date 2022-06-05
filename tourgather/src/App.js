import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import React, { useCallback, useState, useEffect, useMemo } from 'react';

import LocationView from './components/LocationView';
import NewLocationForm from './components/NewLocationForm';
import Locations from './components/Locations';
import EditLocation from './components/EditLocation';
import LocationIndex from './components/LocationIndex';
import NavigationBar from './components/NavigationBar';



function App() {
  return (
    <div className="App">
      <NavigationBar />
      {/* <h1 className='app-header'>App main component</h1> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="location" element={<Locations />}>
          <Route path=":locationId" element={<LocationView />} />
          <Route path=":locationId/edit" element={<EditLocation />} />
          <Route path="new" element={<NewLocationForm />} />
          <Route index element={<LocationIndex />} />
        </Route>
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Home</h2>
        <p>You can do this, I believe in you.</p>
      </main>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h1 className='about-header'>Who are we?</h1>
        <p className='about-para'>
          <Link to="/"> Home </Link>
        </p>
      </main>
    </>
  );
}


export default App;


