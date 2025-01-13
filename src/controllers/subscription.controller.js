import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { subscriber } = req.user;
  if (!subscriber)
    throw new ApiError(400, "Unable to Subscribe.. Kindly Login");

  const { channelId } = req.params;
  if (!isValidObjectId(channelId))
    throw new ApiError(400, "Channel doesn't exist");

  const subscription = await Subscription.findOne({
    subscriber: subscriber,
    channel: channelId,
  });

  if (subscription) {
    await Subscription.findByIdAndDelete(subscription._id);
    return res.status(200).json(new ApiResponse("Unsubscribed Successfully"));
  } else {
    await Subscription.create({ subscriber: subscriber, channel: channelId });
    return res.status(200).json(new ApiResponse("Subscribed Successfully"));
  }
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  //   CONTROLLER TO RETURN SUBSCRIBER LIST OF A CHANNEL
  const { channelId } = req.params;

  if (!isValidObjectId(channelId))
    throw new ApiError(400, "Channel Doesn't Exists");

  const subscribers = await Subscription.aggregate([
    {
      $match: {
        channel: mongoose.Types.ObjectId(channelId),
      },
    },

    {
      $lookup: {
        from: "User",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriber-details",
      },
    },
    {
      $unwind: "subscriber-details",
    },
    {
      $project: {
        "subscriberDetails.password": 0,
      },
    },
  ]);

  return res
    .send(200)
    .json(
      new ApiResponse(200, subscribers, "Subscribers fetched successfully ..."),
    );
});

const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.user;

  if (!isValidObjectId(subscriberId))
    throw new ApiError(400, "Subscriber doesn't Exist");

  const subscribedChannels = await Subscription.aggregate([
    {
      $match: {
        subscriber: mongoose.Types.ObjectId(subscriberId),
      },
    },

    {
      $lookup:{
        from:"User",
        localField:"channel",
        foreignField:"_id",
        as:"channel-details"
      }
    },

    {
      $unwind:"channel-details"
    },

    {
      $project: {
        "channelDetails.password": 0,
      },
    },
  ]);

  return res
    .send(200)
    .json(
      new ApiResponse(200, subscribedChannels, "Subscribed Channels fetched successfully ..."),
    );
});

export { toggleSubscription, getSubscribedChannels, getUserChannelSubscribers };
