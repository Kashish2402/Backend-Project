import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ChannelName from "./pages/ChannelName";
import ChannelHome from "./components/ChannelHome";
import History from "./pages/History";
import LikedVideos from "./pages/LikedVideos";
import SubscribedChannels from "./pages/SubscribedChannels";
import PlayVideo from "./pages/PlayVideo";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/history" element={<History />} />
        <Route path="/liked-videos" element={<LikedVideos />} />
        <Route path="//subscribed-channels" element={<SubscribedChannels />} />
        <Route path="/channel-name/:channelName" element={<ChannelName />} />
        <Route path="/channel-name/:channelName/home" element={<ChannelHome />} />
        <Route path="/video/:videoId" element={<PlayVideo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
