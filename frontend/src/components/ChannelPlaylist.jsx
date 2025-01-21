import React from 'react'
import Playlist from './Playlist'

function ChannelPlaylist() {
  return (
    <div className='w-full mt-10 flex flex-wrap items-center justify-center gap-8'>
      <Playlist className={`w-[350px] h-[25vh]`}/>
      <Playlist className={`w-[350px] h-[25vh]`}/>
      <Playlist className={`w-[350px] h-[25vh]`}/>
      <Playlist className={`w-[350px] h-[25vh]`}/>
      <Playlist className={`w-[350px] h-[25vh]`}/>
    </div>
  )
}

export default ChannelPlaylist
