import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnClodinary } from "../utils/cloudinary.js";
import { json } from "express";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // TODO: get video, upload to cloudinary, create video

  if (!(title || description))
    throw new ApiError(400, "Title or Description Needed");

  const videoFileLocalPath = req.files?.videoFile?.[0].path;
  const thumbnailLocalPath = req.files?.thumbnail?.[0].path;

  if (!(videoFileLocalPath && thumbnailLocalPath))
    throw new ApiError(400, "Video File & thumbnail must required");

  const videoFile = await uploadOnClodinary(videoFileLocalPath);
  const thumbnail = await uploadOnClodinary(thumbnailLocalPath);

  if (!(videoFile && thumbnail))
    throw new ApiError(400, "Error in uploading files to the server");

  const video = await Video.create({
    title,
    description,
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    duration: videoFile.duration,
  });

  console.log(video[0]);

  return res
    .status(200)
    .json(new ApiResponse(200, video[0], "Video uploaded Successfully!! "));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id

  const video = await Video.findById(videoId);

  if (!video)
    throw new ApiError(400, "Unable to fetch video you are requesting..");

  res
    .status(200)
    .json(new ApiResponse(200, video, "Video Fetched Successfully!!"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail

  const { title, description } = req.body;

  console.log(req.body)

  if (!(title || description))
    throw new ApiError(400, "Title or description Required");

  const thumbnailLocalPath = req.file?.path;

  console.log(req.file)

  if (!thumbnailLocalPath) throw new ApiError(400, "thumbnail Required");

  const thumbnail = await uploadOnClodinary(thumbnailLocalPath);

  if (!thumbnail)
    throw new ApiError(
      400,
      "Something went wrong... Unable to upload video on Server",
    );

  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title,
        description,
        thumbnail: thumbnail.url,
      },
    },
    {
      new: true,
    },
  );

  if (!video) throw new ApiError(400, "Video not fetched from database");

  res.status(200).json(new ApiResponse(200,video,"Video Updated Successfully!! "))
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video

  const video=await Video.findByIdAndDelete(videoId,(err,docs)=>{
    if(err) throw new ApiError(400,"Unable to Delete Video")
  
  else{
    console.log("Video Updated Successfully ")
  }
}
)

return res.status(200).json(new ApiError(200,"Video Deleted SuccessFully"))

});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  let video=await Video.findByIdAndUpdate(
    videoId,
    {
      $set:{
        isPublished:(!isPublished)
      }
    },
    {
      new:true
    }
  )

  if(!video) throw new ApiError(400,"Unable to toggle status")

    res.status(200).json(new ApiResponse(200,video,"Toggled successfully"))
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
