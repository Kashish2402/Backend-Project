import { communityPost } from "../models/communityPost.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import mongoose, { isValidObjectId } from "mongoose";

const createCommunityPost = asyncHandler(async (req, res) => {
  const { userId } = req.user?._id;
  const { content } = req.body;

  if (!userId) throw new ApiError(400, "User does not Exist");

  if (!content.trim()) throw new ApiError("Content not available for the post");

  const post = await communityPost.create({
    content,
    owner: userId,
  });

  if (!post) throw new ApiError(400, "Something went wrong, Unable to post");

  return req
    .status(200)
    .json(new ApiResponse(200, post, "Community Post posted successfully"));
});

const updateCommunityPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  if (!isValidObjectId(postId))
    throw new ApiError(400, "Community Post not exist");

  if (!content.trim())
    throw new ApiError(400, "Provide updated content for post");

  const post = await communityPost.findByIdAndUpdate(postId, {
    content: content,
  });

  if (!post)
    throw new ApiError(400, "Something went wrong, Unable to update the post");

  return req
    .status(200)
    .json(new ApiResponse(200, post, "Community Post updated successfully"));
});

const deleteCommunityPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  if (!isValidObjectId(postId))
    throw new ApiError(400, "Community Post not exist");

  const post = await communityPost.findByIdAndDelete(postId);

  if (!post)
    throw new ApiError(400, "Something went wrong, Unable to delete the post");

  return req
    .status(200)
    .json(new ApiResponse(200, post, "Community Post deleted successfully"));
});

const getUserCommunityPost = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) throw new ApiError("Please login to get posts");

  const post = await communityPost.aggregate([
    {
      $match: {
        owner: mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "User",
        localField: "owner",
        foreignField: "_id",
        as: "owner",

        pipeline: {
          $project: { username: 1, "avatar.url": 1 },
        },
      },
    },
    {
      $lookup: {
        from: "Like",
        localField: "_id",
        foreignField: "communityPost",
        as: "likes",
        pipeline: {
          $project: {
            likedBy: 1,
          },
        },
      },
    },
    {
      $addFields: {
        likesCount: { size: "$likes" },
        isLiked: [req.user?._id, "$likes.likedBy"],
      },
    },
    {
      $project: {
        createdAt: 1,
        content: 1,
        owner: { $first: "$owner" },
        likesCount: 1,
        isLiked: 1,
      },
    },
  ]);

  if (!post)
    throw new ApiError(400, "Something went wrong, Unable to fetch posts");

  return req
    .status(200)
    .json(
      new ApiResponse(200, post, "All Community Posts fetched successfully"),
    );
});

export {
  createCommunityPost,
  getUserCommunityPost,
  updateCommunityPost,
  deleteCommunityPost,
};
