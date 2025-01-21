import React from "react";
import Container from "./Container";
import Video from "./Video";

function VideoList() {
  return (
    <Container className="mt-10">
      <div className="flex justify-center">
      <div className="flex flex-wrap gap-8 justify-evenly">
        <Video className={`min-w-[350px] h-[30vh] `}/>
        <Video className={`min-w-[350px] h-[30vh] `}/>
        <Video className={`min-w-[350px] h-[30vh] `}/>
        <Video className={`min-w-[350px] h-[30vh] `}/>
        <Video className={`min-w-[350px] h-[30vh] `}/>
        <Video className={`min-w-[350px] h-[30vh] `}/>
        <Video className={`min-w-[350px] h-[30vh] `}/>
       
       
        
      </div>
      </div>
    </Container>
  );
}

export default VideoList;
