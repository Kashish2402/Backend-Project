import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video

  const { videoId } = req.params;

  if (!isValidObjectId(videoId))
    throw new ApiError(400, "VideoId not available");

  const userId = req.user?._id;
  if (!userId) throw new ApiError(400, "Login to comment on the post");

  const { comment } = req.body;

  if (!comment || comment.length < 0)
    throw new ApiError(400, "Please Enter the comment");

  const commen = await Comment.create({
    content: comment,
    video: videoId,
    owner: userId,
  });
  if (!commen)
    throw new ApiError(400, "Server Error... Unable to create comment");

  return res
    .status(200)
    .json(new ApiResponse(200, commen, "Comment added Successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { commentId } = req.params;
  const { updatedContent } = req.body;
  const { userId } = req.user?._id;

  if (!userId) throw new ApiError(400, "Unable to edit comment please login");

  if (!isValidObjectId(commentId)) throw new ApiError(400, "Comment not found");

  if (!updatedContent) throw new ApiError(400, "Updated Comment not available");

  const comment = await Comment.findByIdAndUpdate(commentId, {
    content: updatedContent,
  });

  if (!comment) throw new ApiError(400, "Unable to update comment");

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment Updated Successfully!!"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;

  if (!isValidObjectId(commentId)) throw new ApiError(400, "Comment no found");

  const comment = await Comment.findByIdAndDelete(commentId);

  if (!comment) throw new ApiError(400, "Unable to delete comment");

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment Deleted Successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
