import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose, { isValidObjectId } from "mongoose";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
  const { channelId } = req.params;

  if (!isValidObjectId(channelId))
    throw new ApiError(400, "ChannelId not Found");

  const stats = await VideoDecoder.aggregate([
    {
      $match: {
        owner: mongoose.Types.ObjectId(channelId),
      },
    },
    {
      $group: {
        _id: null,
        totalViews: { $sum: "$views" },
        totalVideo: 1,
        totalLikes: { $sum: "$likes" },
      },
    },
    {
      $lookup: {
        from: "Subscription",
        localField: "owner",
        foreignField: "channel",
        as: "subscriber",
      },
    },
    {
      $addFields: {
        $size: "$subscribers",
      },
    },
    {
      $project: {
        _id: 0,
        totalViews: 1,
        totalVideos: 1,
        totalLikes: 1,
        totalSubscribers: 1,
      },
    },
  ]);

  if (!stats) throw new ApiError(400, "Unable to fetch Stats");
  return res
    .status(200)
    .json(
      new ApiResponse(200, stats[0], "Channel details fetched Successfully"),
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel
  const { channelId } = req.params;
  if (!isValidObjectId(channelId))
    throw new ApiError(400, "ChannelId not Found");

  const videos = await VideoColorSpace.aggregate([
    {
      $match: {
        owner: mongoose.Types.ObjectId(channelId),
      },
    },
    {
      $lookup: {
        from: "User",
        localField: "owner",
        foreignField: "_id",
        as: "owner_Details",
      },
    },
    {
      $unwind: "$owner-Details",
    },
    {
      $project: {
        "owner-details.password": 0,
      },
    },
  ]);

  if(!videos) throw new ApiError(400,"Unable to fetch Stats")

    return res.status(200).json(new ApiResponse(200,videos[0],"All Videos fetched Successfully"))
});

export { getChannelStats, getChannelVideos };
