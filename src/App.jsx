import { useState, useRef, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Portfolio from "./pages/Portfolio";
import Login from "./components/authPage/Login";
import Register from "./components/authPage/Register";
import '@fortawesome/fontawesome-free/css/all.min.css';
import IntroPage from "./components/authPage/IntroPage";



export default function App() {

    return (
        <div>

            <Routes>
                <Route path="/login" element={ <Login /> } />
                <Route path="/register" element={ <Register /> } />

                <Route path="/" element={ <LandingPage /> } />
                <Route path="/dashboard" element={ <Dashboard /> } />

                <Route path="/intro" element={ <IntroPage /> } />


                {/* <Route path="/port" element={ <Portfolio /> } /> */}
            </Routes>

        </div>
    )
}






