import makeStyle from "@material-ui/core/styles/makeStyles";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SideBar from "./container/SideBar";
import CreatePitch from "./pages/createPitch/CreatePitch";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Pitches from "./pages/Pitches/Pitches";
import Signup from "./pages/SignUp/Signup";
import VerifyUser from "./pages/VerifyCode/VerifyCode";

function App() {
  const location = useLocation();
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <SideBar />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/pitches" element={<Pitches />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-user" element={<VerifyUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createPitch" element={<CreatePitch />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

const useStyle = makeStyle((theme) => ({
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
}));
