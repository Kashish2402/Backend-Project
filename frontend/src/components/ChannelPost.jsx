import React, { useState } from "react";

import Post from "./Post";

function ChannelPost({ username, fullname }) {
  

  return (
    <div className="lg:w-[55%] mx-auto pt-10  p-2 rounded-xl border border-transparent border-l-gray-600 border-r-gray-600 ">
      <Post username={username} fullname={fullname}/>
      <Post username={username} fullname={fullname}/>
      <Post username={username} fullname={fullname}/>
      <Post username={username} fullname={fullname}/>
      <Post username={username} fullname={fullname}/>
    </div>
  );
}

export default ChannelPost;
