import React, { useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import Navbar from "../components/Navbar";
import SideVideo from "../components/SideVideo";
import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import Comments from "../components/Comments";

function PlayVideo() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const setLike = (liked) => {
    if (!liked) {
      setLikeCount((prev) => prev + 1);
    } else {
      setLikeCount((prev) => prev - 1);
    }
  };

  const toggleLike = () => {
    setLiked(!liked);
    setLike(liked);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row w-full p-4 bg-black mx-auto mt-8 md:divide-x divide-gray-600">
        <div className="w-full md:w-3/4 pr-2">
          <div className="relative h-[60vh] w-full bg-black">
            <VideoPlayer />
          </div>

          <div className="videoInfo mt-4">
            <h1 className="ml-2 text-3xl font-bold">Title</h1>

            <div className="flex flex-col md:flex-row justify-between ">
              <div className="flex items-center md:w-[50%]">
                <div className="mt-2 ml-2 flex gap-3">
                  <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
                    <img
                      src="https://pics.craiyon.com/2023-10-11/08fe844788ab42f5a9d70ba5ca2e98ee.webp"
                      className="h-full w-full object-contain object-center rounded-full"
                      alt=""
                    />
                  </div>

                  <div>
                    <h1 className="text-xl font-medium">Channel Name</h1>
                    <p className="text-sm text-gray-600 font-normal">
                      1.65M Subscribers
                    </p>
                  </div>
                </div>
              </div>

              <button className="bg-white text-black px-3 rounded-xl h-[5vh] font-bold mt-2 md:mt-0">
                Subscribe
              </button>

              <div className="flex gap-4 mt-4 md:mt-0">
                <div className="bg-[#121212] p-2 rounded-xl cursor-pointer flex gap-2 h-fit">
                  <span onClick={toggleLike}>
                    {!liked ? (
                      <SlLike className="text-xl" />
                    ) : (
                      <AiFillLike className="text-xl" />
                    )}
                  </span>
                  <span>{likeCount}</span>
                </div>

                <div className="bg-[#121212] p-2 h-fit rounded-xl flex gap-1 cursor-pointer">
                  <IoIosShareAlt className="text-xl" />
                  <span>Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:h-[70vh] md:w-1/4 mt-4 md:mt-0 gap-3 flex flex-col md:pl-2 md:overflow-scroll">
          <SideVideo />
          <SideVideo />
          <SideVideo />
          <SideVideo />
          <SideVideo />
          <SideVideo />
          <SideVideo />
          <SideVideo />
          <SideVideo />
        </div>
      </div>

      <div className="mt-10 flex w-[80%] mx-auto divide-y-0 flex-col gap-5">
        <div>
          <h1 className="text-3xl font-bold">Comments</h1>
        </div>
        <div className="flex flex-col gap-8">
          <Comments/>
          <Comments/>
          <Comments/>
          <Comments/>
          <Comments/>
          <Comments/>
        </div>
      </div>
    </div>
  );
}

export default PlayVideo;
