import React from "react";
import { GoDotFill } from "react-icons/go";
import { useParams,useNavigate } from "react-router-dom";

function Video({ className , videoId}) {
 
  const navigate=useNavigate()
  return (
    <div
      className={`${className} flex flex-col items-center cursor-pointer hover:scale-105 transition-all ease-in-out duration-300`}
    
    >
      <div className="overflow-hidden rounded-t-xl relative z-10" onClick={()=>navigate('video/:${videoId}')}>
        <img
          src="https://th.bing.com/th/id/OIP.GPFEY6kfgxbsja6gmrW6rwHaE7?w=274&h=183&c=7&r=0&o=5&pid=1.7"
          classname=""
          width="400px"
          alt="VideoThumbnail"
        />
        <div className="absolute right-0 bottom-0 bg-[#000000cc] px-2">09:36:40</div>
      </div>
      <div className="w-full flex items-center gap-3  bg-black p-2 rounded-b-xl">
        <div className="w-10 h-10 rounded-full">
          <img
            src="https://th.bing.com/th/id/OIP.GPFEY6kfgxbsja6gmrW6rwHaE7?w=274&h=183&c=7&r=0&o=5&pid=1.7"
            className="w-full h-full rounded-full"
            alt="profile-icon"
          />
        </div>

        <div className="">
          <h1 className="font-medium">Title</h1>
          <span className="text-sm  text-gray-400 " onClick={()=>navigate("../../channel-name/:channelName")}>Channel Name</span>
          <span>
            <GoDotFill className="inline text-[10px] text-gray-300 mx-1" />
          </span>

          <span className="text-sm text-gray-500 ">20K Views</span>
          <span>
            <GoDotFill className="inline text-[10px] text-gray-300 mx-1" />
          </span>
          <span className="text-sm text-gray-500">1 hour ago</span>
        </div>
      </div>
    </div>
  );
}

export default Video;
