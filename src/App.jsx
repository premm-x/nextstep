import { useState, useRef, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Portfolio from "./pages/Portfolio";
import Login from "./components/authPage/Login";
import Register from "./components/authPage/Register";




export default function App() {

    return (
        <div>

            <Routes>
                <Route path="/login" element={ <Login /> } />
                <Route path="/register" element={ <Register /> } />

                <Route path="/" element={ <LandingPage /> } />
                <Route path="/dashboard" element={ <Dashboard /> } />


                {/* <Route path="/port" element={ <Portfolio /> } /> */}
            </Routes>

        </div>
    )
}






