import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Playlist } from "../models/playlists.model.js";
import mongoose, { isValidObjectId } from "mongoose";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user?._id;

  //TODO: create playlist

  if (!userId) throw new ApiError(400, "Can't create playlist");

  if (!(name || description))
    throw new ApiError(400, "Name and description empty");

  const playlist = await Playlist.create({
    name,
    description,
    owner: userId,
  });

  if (!playlist)
    throw new ApiError(400, "Something went Wrong.. Unable to create Playlist");

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist created Successfully"));
});

const getUserPlaylist = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists

  if (!isValidObjectId(userId)) throw new ApiError(400, "user not found");

  const playlist = await Playlist.aggregate([
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
        as: "owner-Details",
      },
    },
    {
      $unwind: "$owner-Details",
    },
    {
      $project: {
        "owner-Details.password": 0,
      },
    },
  ]);

  if (!playlist) throw new ApiError(400, "Can't fetch user playlist");

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "User Playlist Fetched Successfully"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id

  if (!isValidObjectId(playlistId))
    throw new ApiError(400, "Playlist Id not found");

  const playlist = await Playlist.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(playlistId),
      },
    },
    {
      $lookup: {
        from: "User",
        localField: "owner",
        foreignField: "_id",
        as: "owner-Details",
      },
    },
    {
      $unwind: "$owner-Details",
    },
    {
      $project: {
        "owner-Details.password": 0,
      },
    },
  ]);

  if (!playlist) throw new ApiError(400, "Can't fetch user playlist");

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "User Playlist Fetched Successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!(isValidObjectId(playlistId) && isValidObjectId(videoId)))
    throw new ApiError(400, "Playlist Id or Video Id not found");

  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $addToSet: {
        videos: videoId,
      },
    },
    {
      new: true,
    },
  );

  if (!playlist) throw new ApiError(400, "Can't add video to playlist");

  return res
    .status(200)
    .json(
      new ApiResponse(200, playlist, "Added Video to Playlist Successfully"),
    );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist

  if (!(isValidObjectId(playlistId) && isValidObjectId(videoId)))
    throw new ApiError(400, "Playlist Id or Video Id not found");

  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $pull: {
        videos: videoId,
      },
    },
    {
      new: true,
    },
  );

  if (!playlist) throw new ApiError(400, "Can't remove video to playlist");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        playlist,
        "Removed Video from Playlist Successfully",
      ),
    );
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist

  if (!isValidObjectId(playlistId))
    throw new ApiError(400, "Playlist Id not found");

  const playlist = await Playlist.findByIdAndDelete(playlistId);
  if (!playlist) throw new ApiError(400, "Can't delete playlist");

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist deleted Successfully"));
});

const updatePlaylistDetails = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist

  if (!isValidObjectId(playlistId))
    throw new ApiError(400, "Playlist Id not found");

  if (!(name || description))
    throw new ApiError(400, "Name and description empty");

  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      name,
      description,
    },
    {
      new: true,
    },
  );

  if (!playlist) throw new ApiError(400, "Somethimg went wrong, Unable to update Playlist details ");

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist details updated Successfully"));
});


export {
  createPlaylist,
  getUserPlaylist,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylistDetails,
};
