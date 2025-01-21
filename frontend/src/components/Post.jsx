import React,{useState} from "react";
import { GoDotFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";

function Post({ username, fullname, commentCount }) {
  const [isLiked, setIsLiked] = useState(true);
  const [isComment,isSetComment]=useState(true)

  const handleClick = () => {
    setIsLiked((prev) => !prev);
  };

  const handleShowComments=()=>{

  }

  return (
    <div className="w-full mb-16 px-3">
      <div className="flex gap-4">
        <div className="h-[6vh] w-[6vh]">
          <img
            src="https://pics.craiyon.com/2023-10-11/08fe844788ab42f5a9d70ba5ca2e98ee.webp"
            alt=""
            className="h-full w-full rounded-full object-cover object-center"
          />
        </div>

        <div>
          <h1 className="text-lg font-medium">{fullname || "Ganu"}</h1>
          <p>
            <span className="text-gray-400">@{username || "ganu"}</span>
            <GoDotFill className="inline text-[10px] text-gray-300 mx-1" />
            <span className="text-gray-600 font-bold text-sm">12hrs ago</span>
          </p>
        </div>
      </div>

      <div className="h-[55vh] w-full mt-2">
        <img
          src="https://static.vecteezy.com/system/resources/previews/000/540/055/original/seascape-poster-background-graphic-design-vector-illustration.jpg"
          className="h-full w-full object-center object-cover"
          alt=""
        />
      </div>

      <div className="border-t border-gray-700 mt-4 flex">
        {isLiked ? (
          <GoHeart className="mt-3 mx-3 text-3xl cursor-pointer" onClick={handleClick} />
        ) : (
          <GoHeartFill
            className="mt-3 mx-3 text-red-700 text-3xl cursor-pointer"
            onClick={handleClick}
          />
        )}

        <FaRegComment className="mt-3 mx-3 text-white text-3xl cursor-pointer" />

        <FaShare className="mt-3 mx-3 text-white text-3xl cursor-pointer" />
      </div>

      <div className="mt-2 ml-2">
        <span className="font-semibold">{username || "ganu"} </span>
        <span className="ml-1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates ab odit in maxime est facilis ad sequi exercitationem quas aut.
        </span>

        <p className="text-gray-600 font-bold cursor-pointer" onClick={handleShowComments}>View all {commentCount} comments</p>
      </div>
    </div>
  );
}

export default Post;
