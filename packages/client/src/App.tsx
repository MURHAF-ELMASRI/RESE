import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Pitches from "./pages/Pitches/Pitches";
import Signup from "./pages/SignUp/Signup";
import VerifyUser from "./pages/VerifyCode/VerifyCode";
function App() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/pitches" element={<Pitches />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/verify-user" element={<VerifyUser/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
