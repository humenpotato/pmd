import { Route, Routes } from "react-router-dom";
import SpeedDailNavigation from "./components/SpeedDail";
import {Dashboard} from "./components/Dashboard";
import Signin from "./pages/Signin";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import {InItAuthInfo, User} from "./Services/UserAuth";

function App() {
  const navigate = useNavigate();
  const user : any = User();


  useEffect(() => {
    if (!user) {
      navigate("/signin")
    } else {
      console.log(user);
      navigate("/dashboard")
    }
  },[]);

  useEffect(() => {
    if (window.location.protocol === "chrome-extension:") {
      const popup = chrome.extension.getViews({ type: "popup" });
      if (popup.length > 0) {
        chrome.tabs.create({
          url: "chrome-extension://ohneepolbkgmlanflmaanhglildigmdd/index.html",
        });
      } else {
        console.log("Trying to get info without")
        InItAuthInfo()
      }
    }
  },[]);


  return (
    <Box
        // sx={{
        //   '& > :not(style)': { m: 1, width: '25ch' },
        // }}
    >
      <SpeedDailNavigation />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard/:parameter" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Box>
  );
}

export default App;
