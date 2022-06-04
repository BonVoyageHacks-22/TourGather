import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import './App.css';
import { Profile } from './screens/profile';
import { Guides } from './screens/guides';

function App() {
  return (
    <div className="App">
      <h1 className='app-header'>App main component</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="guides" element={<Guides/>} />
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
      <nav>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
          <Link to="/">Home</Link>
          </li>
          <li>
          <Link to="/guides">Guides</Link>
          </li>
      </nav>
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


