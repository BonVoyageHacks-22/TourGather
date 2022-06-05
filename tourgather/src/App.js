import './App.css';
import {Router, Routes, Route, Link, BrowserRouter} from "react-router-dom";
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import LocationView from './components/LocationView';
import NewLocationForm from './components/NewLocationForm';
import Locations from './components/Locations';
import EditLocation from './components/EditLocation';
import LocationIndex from './components/LocationIndex';
import LocationNotFound from './components/LocationNotFound';
import NavigationBar from './components/NavigationBar';
import Itinery from './components/Itinery';

import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./AuthContext";
import Dashboard from "./Dashboard"
import { BrowserRouter as Switch } from "react-router-dom"
import Login from "./Login"
import UpdateProfile from "./UpdateProfile";
// import PrivateRoute from "./PrivateRoute";

import './App.css';
import { Profile } from './components/Profile';
import { Guides } from './components/Guides';

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
        <Route path="notFound" element={<LocationNotFound />} />
        <Route path="new" element={<NewLocationForm />} />
        <Route index element={<LocationIndex />} />
        </Route>
        <Route path="signup" element={<Signingup />} />
        <Route path="login" element={<Loginin/>} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="update-profile" element={<UpdateProfile/>} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="guides" element={<Guides/>} />
        <Route path="calendar" element={<Itinery/>} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <>

    <main>
    <div className="home-container">
      <h1 className="home-header">Welcome to TourGather!</h1>
      <p className="home-text">
        Take a break from your busy life and plan your perfect daycation with us! <br/>
        View all our locations, or even add your own!
        You can also look through the list of guides to find the perfect one for you. 
      </p>        
    </div>
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


