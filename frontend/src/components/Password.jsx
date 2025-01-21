import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

function Password({ value, onChange }) {
  const [isPasswordVisible, setIsPasswordVisible] =useState(false);

  const handleClick = () => {
    setIsPasswordVisible((prevState)=>!prevState);
  };
  return (
    <div className="w-full bg-black rounded-2xl px-3 py-2 flex items-center border-b border-b-purple-700 active:shadow-lg active:shadow-purple-600">
      <input
        type={isPasswordVisible ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent outline-none "
        placeholder="password"
      />
      <button type="button" onClick={handleClick}>
        {isPasswordVisible ? <IoEyeSharp /> : <FaEyeSlash />}
      </button>
    </div>
  );
}

export default Password;
