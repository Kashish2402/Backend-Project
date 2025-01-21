import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isloggedin, setIsLoggedin] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const handleCloseHamburger = () => {
    setIsHamburgerOpen(false);
  };
  const handleOpenHamburger = () => {
    setIsHamburgerOpen(true);
  };

  const handleLogin = () => {
    if (!isloggedin) {
      navigate("/login");
    }
  };

  const handleSearch = () => {};

  return (
    <div className="z-0 bg-black px-6 py-8 flex items-center justify-center md:justify-between shadow-2xl shadow-[#8474741f] rounded-b-2xl">
      <div className="flex ">
        <button
          className=" absolute left-5 md:relative"
          onClick={handleOpenHamburger}
        >
          <GiHamburgerMenu className="text-white text-2xl " />
        </button>
        <div className="ml-8 tracking-wider">
          <span className="italic text-purple-500 font-black text-2xl mr-[2px]">
            Vi
          </span>
          <span className="text-2xl text-purple-300 font-black">deo</span>
          <span className="italic text-purple-500 font-black text-2xl">fy</span>
        </div>
      </div>

      <div className="hidden w-[300px] lg:w-[500px]   md:flex items-center rounded-full border-2 border-gray-500">
        <input
          type="text"
          className="py-2 px-4 bg-transparent outline-none text-gray-400 border-r border-gray-500 w-[90%]"
          placeholder="Enter your interest.."
        />
        <button
          className="flex items-center justify-center w-[10%] text-xl "
          onClick={handleSearch}
        >
          <IoIosSearch />
        </button>
      </div>

      <div className="hidden md:flex md:items-center md:gap-8">
        <button
          className={`flex items-center gap-2  bg-purple-200 text-black p-2 px-3  text-base rounded-lg font-bold hover:bg-purple-400 transition-all ease-in-out duration-200 delay-150`}
          onClick={handleLogin}
        >
          <span>
            <CgProfile
              className={`text-xl ${isloggedin ? "hidden" : "block"}`}
            />
          </span>
          <span>{isloggedin ? "Log Out" : "Sign in"}</span>
        </button>

        <div>
          <button
            className={`${
              isloggedin ? "hidden" : "block"
            } text-purple-200  p-2 px-3 rounded font-bold hover:text-purple-500 transition-all ease-in-out duration-200 delay-150`}
            onClick={() => navigate("/sign-up")}
          >
            Register
          </button>
        </div>
      </div>

      {isHamburgerOpen && (
        <div
          className={` absolute z-50 bg-black top-0 left-0 w-[300px] md:w-[400px] h-[100vh] rounded-l-3xl flex flex-col items-center p-10 ${
            isHamburgerOpen ? "translate-x-0" : "translate-x-full"
          } transition-all ease-in-out duration-300 delay-150`}
        >
          <button
            className="absolute right-6 top-4 text-2xl"
            onClick={handleCloseHamburger}
          >
            <RxCross1 />
          </button>

          <div className="tracking-wider pb-6">
            <span className="italic text-purple-500 font-black text-4xl mr-[2px]">
              Vi
            </span>
            <span className="text-3xl text-purple-300 font-black">deo</span>
            <span className="italic text-purple-500 font-black text-4xl">
              fy
            </span>
          </div>

          <div className="border opacity-20 border-purple-400 w-3/4 mb-8"></div>

          <div className="w-[60%]">
            <ul className="flex flex-col w-full divide-y-2 divide-gray-700 ">
              <li className="text-center p-2 font-medium hover:bg-gray-700 rounded transition-all ease-in-out duration-100">
                <Link to="/dashboard">Home</Link>
              </li>

              <li className="text-center p-2 py-4  font-medium hover:bg-gray-700 rounded transition-all ease-in-out duration-100">
                <Link to="/history">History</Link>
              </li>

              <li className="text-center p-2 py-4  font-medium hover:bg-gray-700 rounded transition-all ease-in-out duration-100">
                <Link to="/liked-videos">Liked Videos</Link>
              </li>

              <li className="text-center p-2 py-4  font-medium hover:bg-gray-700 rounded transition-all ease-in-out duration-100">
                <Link to="/subscribed-channels">Subscribed Channels</Link>
              </li>
            </ul>
          </div>

          <div className="border opacity-20 border-purple-400 w-full mt-10 md:hidden"></div>
          <div className="w-[60%] flex items-center flex-col gap-8 md:hidden mt-10">
            <div className="w-[250px] md:w-[300px] flex items-center rounded-full border-2 border-gray-500 ">
              <input
                type="text"
                className="py-2 px-4 bg-transparent outline-none text-gray-400 border-r border-gray-500 w-[90%]"
                placeholder="Enter your interest.."
              />
              <button className="py-2 px-4 flex items-center justify-center text-white ">
                Search
              </button>
            </div>

            <div className="w-[200px] flex items-center flex-col gap-8">
              <button
                className={`flex justify-center items-center gap-2  bg-purple-200 text-black p-2 px-3  text-base rounded-lg font-bold hover:bg-purple-400 transition-all ease-in-out duration-200 delay-150 w-full`}
                onClick={handleLogin}
              >
                <span>
                  <CgProfile
                    className={`text-xl ${isloggedin ? "hidden" : "block"}`}
                  />
                </span>
                <span>{isloggedin ? "Log Out" : "Sign in"}</span>
              </button>

              <div className="w-[200px]">
                <button
                  className={`${
                    isloggedin ? "hidden" : "block"
                  } text-purple-200  p-2 px-3 rounded font-bold hover:text-purple-500 transition-all ease-in-out duration-200 delay-150 border w-full hover:border-purple-500`}
                  onClick={() => navigate("/sign-up")}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
