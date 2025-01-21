import React from 'react'
import Navbar from '../components/Navbar'
import Video from '../components/Video'

function LikedVideos() {
  return (
    <div>
      <Navbar/>

      <div className='w-[80%] mx-auto  mt-10'>
        <h1 className='font-bold mb-8 text-3xl ml-3 italic'>Liked videos </h1>
        <div className='flex flex-wrap items-center justify-center gap-8'>
        <Video className={`w-[350px] h-[25vh]`}/>
          <Video className={`w-[350px] h-[25vh]`}/>
          <Video className={`w-[350px] h-[25vh]`}/>
          <Video className={`w-[350px] h-[25vh]`}/>
          <Video className={`w-[350px] h-[25vh]`}/>
          <Video className={`w-[350px] h-[25vh]`}/>
        </div>
         
      </div>
    </div>
  )
}

export default LikedVideos
