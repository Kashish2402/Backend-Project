import React from "react";
import VideoScroll from "./VideoScroll";
import ChannelName from "../pages/ChannelName";

function ChannelHome() {
  return (
    <div>
        
        
        <div className=" mx-auto border-b pb-2 border-b-gray-600">
        <VideoScroll heading="For You" />
      </div>

      <div className="border-b pb-2 border-b-gray-600">
        <VideoScroll heading="Videos" />
      </div>

      <div className="border-b pb-2 border-b-gray-600">
        <VideoScroll heading="Popular Videos" />
      </div>
        </div>
     
    
  );
}

export default ChannelHome;
