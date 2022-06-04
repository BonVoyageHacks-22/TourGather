import './App.css';
import {Router, Routes, Route, Link, BrowserRouter} from "react-router-dom";
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./AuthContext";
import Dashboard from "./Dashboard"
import { BrowserRouter as Switch } from "react-router-dom"
import Login from "./Login"

function App() {
  return (
    <div className="App">
      <h1 className='app-header'>App main component</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="signup" element={<Signingup />} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="login" element={<Loginin/>} />
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
              <Link to="/signup">Sign Up</Link>
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

function Signingup() {
    return (
        <>
            <main>
                <AuthProvider>
                    <Container
                        className="d-flex align-content-center"
                        style={{ minHeight: "100vh" }}
                    >
                        <div
                            className="w-100" style={{ minWidth: "400px" }}
                        >
                            <Signup />

                        </div>

                    </Container>
                </AuthProvider>


                <p className='about-para'>
                    <Link to="/"> Home </Link>
                </p>
            </main>
        </>
    );
}

function Loginin() {
    return (
        <>
            <main>
                <AuthProvider>
                    <Container
                        className="d-flex align-content-center"
                        style={{ minHeight: "100vh" }}
                    >
                        <div
                            className="w-100" style={{ minWidth: "400px" }}
                        >
                            <Login />

                        </div>

                    </Container>
                </AuthProvider>


                <p className='about-para'>
                    <Link to="/"> Home </Link>
                </p>
            </main>
        </>
    );
}


export default App;


