import React from 'react'
import Video from './Video'

function VideoScroll({heading}) {
  return (
    <div className='w-full px-5 md:px-1'>
        <h1 className='text-xl font-semibold ml-3 my-5'>{heading}</h1>
         <div className=' py-3 px-2 flex flex-nowrap gap-10 items-center overflow-x-auto'>
        
        <Video className={`h-[25vh] min-w-[300px] `}/>
        <Video className={`h-[25vh] min-w-[300px] `}/>
        <Video className={`h-[25vh] min-w-[300px] `}/>
        <Video className={`h-[25vh] min-w-[300px] `}/>
        
      </div>
    </div>
   
  )
}

export default VideoScroll
