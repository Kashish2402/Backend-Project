import React from "react";
import Navbar from "../components/Navbar";

function SubscribedChannels() {
  return (
    <div>
      <Navbar/>
      <div className="md:w-[70%] mx-auto mt-10">
        <h1 className="text-2xl font-semibold mb-6 italic">Subscribed Channels</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          <div className="border p-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer hover:scale-105">
            <img
              src={`https://pics.craiyon.com/2023-10-11/08fe844788ab42f5a9d70ba5ca2e98ee.webp`}
              alt=""
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <div className="flex items-center">
              <img
                src="https://pics.craiyon.com/2023-10-11/08fe844788ab42f5a9d70ba5ca2e98ee.webp"
                alt=""
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">Channel 1</h2>
                <p className="text-sm text-gray-500">100 subscribers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscribedChannels;
