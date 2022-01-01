import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login/>}/> */}
      {/* <Route path="/singup" element={<Signup/>}/> */}
    </Routes>
  );
}

export default App;
