import React, { useState } from "react";
import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";

function Comments() {
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
    <div className="w-full flex gap-3">
      <div className="h-[60px] w-[60px] rounded-full overflow-hidden">
        <img
          src="https://pics.craiyon.com/2023-10-11/08fe844788ab42f5a9d70ba5ca2e98ee.webp"
          className="h-full w-full object-cover object-center rounded-full"
          alt=""
        />
      </div>
      <div>
        <div>
          <div>
            <span className="mr-2 text-sm">@Channel Name</span>
            <span className="text-md"> 10 hours ago</span>
          </div>
          <div>
            <p className="test-sm">This is comment</p>
          </div>
            
          <div className="flex gap-3 mt-2">
            <span onClick={toggleLike}>
              {!liked ? (
                <SlLike className="text-xl" />
              ) : (
                <AiFillLike className="text-xl" />
              )}
            </span>
            <span>{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
