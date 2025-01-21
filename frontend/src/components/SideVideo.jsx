import React from 'react'

function SideVideo() {
  return (
    <div className="flex gap-3 cursor-pointer hover:bg-black transition-all ease-in-out duration-200">
    <div className="w-[60%] h-[80px] rounded">
    <img src="https://th.bing.com/th/id/OIP.GPFEY6kfgxbsja6gmrW6rwHaE7?w=274&h=183&c=7&r=0&o=5&pid=1.7" className="w-full h-full object-cover object-center rounded" alt="" />
    </div>
    <div className="w-[40%]">
      <h1 className="whitespace-nowrap">title</h1>
      <p className="text-sm text-nowrap ">Channel Name</p>
    </div>
  </div>
  )
}

export default SideVideo
