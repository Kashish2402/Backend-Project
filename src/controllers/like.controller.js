import mongoose, { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Like } from "../models/likes.model.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  // Toggle Like on video
  const { videoId } = req.params;
  const  userId  = req.user._id;

  if (!isValidObjectId(videoId))
    throw new ApiError(400, "Video Id does not exist");

  if (!userId)
    throw new ApiError(400, "Kindly create account to like the video");

  const like = await Like.findOne({ video: videoId, likedBy: userId });

  if (like) {
    await Like.findByIdAndDelete(like?._id);

    return (
      req.status(200),
      json(new ApiResponse(200, "Unliked Video Successfully !!"))
    );
  } else {
    await Like.create({ video: videoId, likedBy: userId });
    return (
      req.status(200), json(new ApiResponse(200, "Liked Video Successfully !!"))
    );
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  // Toggle Like on Comment
  const { commentId } = req.params;
  const userId  = req.user?._id;

  if (!isValidObjectId(commentId))
    throw new ApiError(400, "Video Id does not exist");

  if (!userId)
    throw new ApiError(400, "Kindly create account to like the video");

  const like = await Like.findOne({ comment: commentId, likedBy: userId });

  if (like) {
    await Like.findByIdAndDelete(like?._id);
    return (
      req.status(200),
      json(new ApiResponse(200, "Unliked Video Successfully !!"))
    );
  } else {
    await Like.create({
      comment: commentId,
      likedBy: userId,
    });

    return (
      req.status(200), json(new ApiResponse(200, "Liked Video Successfully !!"))
    );
  }
});

const toggleCommunityPostLike = asyncHandler(async (req, res) => {
  // Toggle Like on community post

  const {postId}=req.params
  const userId=req.user?._id

  if (!userId)
    throw new ApiError(400, "Kindly create account to like the video");

  if(!isValidObjectId(postId))
    throw new ApiError(400, "Community Post doesn't Exist");

  const like=await Like.findOne({
    communityPost:postId,
    likedBy:userId
  })

  if (like) {
    await Like.findByIdAndDelete(like?._id);
    return (
      req.status(200),
      json(new ApiResponse(200, "Unliked Video Successfully !!"))
    );
  } else {
    await Like.create({
      communityPost: postId,
      likedBy: userId,
    });

    return (
      req.status(200), json(new ApiResponse(200, "Liked Video Successfully !!"))
    );
  }

});

const getLikedVideos = asyncHandler(async (req, res) => {
    const {userId}=req.user?._id

    const likedVideos=await Like.aggregate([
        {
            $match:{
                likedBy:mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from:'Video',
                localField:"video",
                foreignField:"_id",
                as:"video-Details"
            }
        },
        {
            $unwind:"$video-Details"
        },
        {
            $project:{
                "video-Details.owner.password":0
            }
        }
    ])

    return req.status(200).json(new ApiResponse(200,likedVideos,"All liked Videos Fetched Successfully"))
});

export {
  toggleCommentLike,
  toggleVideoLike,
  toggleCommunityPostLike,
  getLikedVideos,
};
