import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Pitches from "./pages/Pitches/Pitches";
import { AnimatePresence } from "framer-motion";
function App() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/pitches" element={<Pitches />} />
        <Route path="/singup" element={<Signup/>}/>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
