import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import ChannelHome from "../components/ChannelHome";
import ChannelVideo from "../components/ChannelVideo";
import ChannelPost from "../components/ChannelPost";
import ChannelPlaylist from "../components/ChannelPlaylist";
import ChannelAbout from "../components/ChannelAbout";

function ChannelName({
  username,
  subscribers,
  description,
  totalVideos,
  isSubscribed,
}) {
  const [isTabActive, setIsTabActive] = useState("home");

  const tabComponents = {
    home: <ChannelHome />,
    videos: <ChannelVideo />,
    post: <ChannelPost />,
    playlist: <ChannelPlaylist />,
    about: <ChannelAbout />,
  };

  const setTab = (tab) => {
    setIsTabActive(tab);
  };

  const { channelName } = useParams();

  return (
    <div>
      <Navbar />
      <div className="  md:w-[70%] mx-auto">
        <div className=" h-[200px] w-full overflow-hidden ">
          <img
            src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg"
            className="object-cover object-center "
            alt=""
          />
        </div>

        <div className="-mt-[80px] lg:-mt-[100px] z-99 relative">
          <div className=" w-full flex items-center p-4">
            <div className="w-1/2 flex items-center justify-end mr-10 ">
              <div className="h-[200px] w-[200px] lg:h-[300px] lg:w-[300px] ">
                <img
                  src="https://pics.craiyon.com/2023-10-11/08fe844788ab42f5a9d70ba5ca2e98ee.webp"
                  alt=""
                  className="object-cover rounded-full object-center"
                />
              </div>
            </div>
            <div className="w-1/2 mt-16">
              <div className="w-full mb-3">
                <h1 className="text-4xl lg:text-6xl font-semibold">
                  {channelName}
                </h1>
                <h2 className="text-gray-500 text-sm md:text-md">
                  @{username || "username"}
                </h2>
                <h3 className="text-gray-600 text-sm md:text-md">
                  <span>{subscribers || "100k"} subscribers</span>{" "}
                  <span>
                    <GoDotFill className="inline text-[10px] text-gray-300 mx-1" />
                  </span>
                  <span>{totalVideos || "100"} videos</span>
                </h3>
              </div>
              <div className="px-8 -ml-8">
                <h1 className="text-md tracking-tight">Description:</h1>
                <p className="text-gray-500 text-sm tracking-tighter">
                  {description &&
                    description.length > 0 &&
                    description.slice(0, 100)}
                  ...
                </p>
              </div>
              <button className="bg-purple-600 px-3 py-2 font-semibold mt-3 rounded-xl">
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full border-b px-5 mt-4 shadow-md shadow-slate-800">
          <ul className="flex justify-between">
            <li
              className={`border-b-4 cursor-pointer px-4 ${
                isTabActive === "home"
                  ? "border-b-gray-600"
                  : "border-b-transparent"
              }`}
            >
              <p onClick={() => setTab("home")}>Home</p>
            </li>
            <li
              className={`border-b-4 cursor-pointer  px-4 ${
                isTabActive === "videos"
                  ? "border-b-gray-600"
                  : "border-b-transparent"
              }`}
            >
              <p onClick={() => setTab("videos")}>Videos</p>
            </li>
            <li
              className={`border-b-4 cursor-pointer px-4 ${
                isTabActive === "playlist"
                  ? "border-b-gray-600"
                  : "border-b-transparent"
              }`}
            >
              <p onClick={() => setTab("playlist")}>Playlist</p>
            </li>
            <li
              className={`border-b-4 cursor-pointer px-4 ${
                isTabActive === "post"
                  ? "border-b-gray-600"
                  : "border-b-transparent"
              }`}
            >
              <p onClick={() => setTab("post")}>Post</p>
            </li>

            <li
              className={`border-b-4 cursor-pointer px-4 ${
                isTabActive === "about"
                  ? "border-b-gray-600"
                  : "border-b-transparent"
              }`}
            >
              <p onClick={() => setTab("about")}>About</p>
            </li>
          </ul>
        </div>

        {tabComponents[isTabActive]}
      </div>
    </div>
  );
}

export default ChannelName;
