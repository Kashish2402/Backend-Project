import React from 'react'
import Video from '../components/Video'

function ChannelVideo() {
  return (
    <div className='w-full mt-10 flex flex-wrap gap-8 items-center justify-center'>
      <Video className={`w-[350px] h-[25vh]`}/>
      <Video className={`w-[350px] h-[25vh]`}/>
      <Video className={`w-[350px] h-[25vh]`}/>
      <Video className={`w-[350px] h-[25vh]`}/>
      <Video className={`w-[350px] h-[25vh]`}/>
      <Video className={`w-[350px] h-[25vh]`}/>
    </div>
  )
}

export default ChannelVideo
