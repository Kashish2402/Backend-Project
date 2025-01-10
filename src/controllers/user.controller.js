import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnClodinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { pipeline } from "stream";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.accessToken = accessToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      400,
      "Something went wrong while generating refresh and access tokens",
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // GET USER DETAILS FROM FRONTEND AS PER OUR USER MODEL

  const { fullName, email, username, password } = req.body;

  console.log("email", username);

  // VALIDATION WEATHER FIELDS ARE EMPTY OR IN RIGHT FORMAT

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields Are Required");
  }

  //  CHECK IF USER ALREADY EXIST

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) throw new ApiError(409, "User Already Exist");

  // CHECK FOR IMAGES OR AVATAR

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "AVATAR REQUIRED");
  }

  // UPLOAD THEM TO CLOUDINARY IF AVAILABLE, AVATAR UPLOADED SUCCECCFULLY OR NOT

  const avatar = await uploadOnClodinary(avatarLocalPath);
  const coverImage = await uploadOnClodinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "AVATAR REQUIRED");
  }

  // CREATE USER OBJECT - CREATE ENTRY IN DB

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    username: username.toLowerCase(),
    email,
    password,
  });

  // REMOVE PASSWORD AND REFRESH TOKEN FIELD FROM RESPONSE
  // CHECK FOR USER CREATION
  const userId = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  if (!userId) {
    throw new ApiError(500, "Something wemt wrong while uploading");
  }

  // RETURN USER
  return res
    .status(201)
    .json(new ApiResponse(200, userId, "USER REGISTERED SUCCESSFULLY"));
});

const loginUser = asyncHandler(async (req, res) => {
  //  TAKING INPUT FROM USER
  const { email, username, password } = req.body;

  // VALIDATE FIELDS
  if (!(username || email)) {
    throw new ApiError(400, "CREDENTIALS REQUIRED");
  }
  // CHECKING IF USER EXISTS OR NOT
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) throw new ApiError(404, "USER DOESN'T EXIST");

  // PASSWORD CHECK IF USER EXISTS

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError("INVALID CREDENTIALS");
  // GENERATING ACCESS TOKEN AND REFRESH TOKEN
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );
  // SEND COOKIES

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "USER LOGGED IN SUCCESSFULLY",
      ),
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  let incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "UNAUTHORISED REQUEST");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "INVALID REFRESH TOKEN ");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh Token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .send(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, newRefreshToken },
          "Access token refreshed",
        ),
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "INVALID REFRESH TOKEN");
  }
});

const changeCurrentUserPassword = asyncHandler(async (req, res) => {
  
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!(confirmPassword === newPassword))
    throw new ApiError(401, "New Password and Confirm Password should be same");
  

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) throw new ApiError(401, "Invalid Password");

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changed Sucessfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(200, req.user, "Current User Fetched Successsfully");
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!(fullName || email)) {
    throw new ApiError(400, "All fields are Required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
      },
    },
    { new: true },
  ).select("-password");

  return res
    .status(200)
    .json(
      200,
      new ApiResponse(200, user, "Account Details Updated Successfully !!..."),
    );
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) throw new ApiError(200, "Avatar File Missing");

  const avatar = await uploadOnClodinary(avatarLocalPath);

  //DELETE EXISTING FILE
  const userdetail = await User.findById(req.user?._id);

  if (userdetail?.avatar) {
    try {
      await deleteFile(user.avatar); // Assuming deleteFile can handle URLs or convert them
    } catch (error) {
      console.error(`Failed to delete old avatar: ${error.message}`);
    }
  }

  if (!avatar)
    throw new ApiError(200, user, "Error while uploading Avatar File");

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true },
  ).select("-password");

  res
    .send(200)
    .json(200, new ApiResponse(200, user, "User Avatar Updated Successfully"));
});

const updateCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) throw new ApiError(200, "Cover Image File missing");

  //DELETE EXISTING FILE
  const userdetail = await User.findById(req.user?._id);

  if (userdetail?.coverImage) {
    try {
      await deleteFile(user.coverImage); // Assuming deleteFile can handle URLs or convert them
    } catch (error) {
      console.error(`Failed to delete old avatar: ${error.message}`);
    }
  }
  const coverImage = await uploadOnClodinary(coverImageLocalPath);

  if (!coverImage)
    throw new ApiError(200, "Error while uploading Cover Image File");

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    {
      new: true,
    },
  ).select("-password");

  res
    .send(200)
    .json(200, new ApiResponse(200, user, "Cover Image Updated Successfully"));
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) throw new ApiError(400, "Username Missing");

  const channel = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },
    {
      $lookup: {
        field: "Subscription",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        field: "Subscription",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscribersCount: {
          $size: "$subscribers",
        },
        channelsSubscribedToCount: {
          $size: "$subscribeTo",
        },
        isSubscribed: {
          $condition: {
            if: {
              $in: [req.user?._id, "$subscribers.subscriber"], //CHECKS WEATHER SUBSCRIBER PRESNT IN THE LIST OR NOT
              then: true,
              else: false,
            },
          },
        },
      },
    },

    {
      $project: {
        fullName: 1,
        username: 1,
        subscribersCount: 1,
        channelsSubscribedToCount: 1,
        isSubscribed: 1,
        avatar: 1,
        coverImage: 1,
      },
    },
  ]);

  if (!channel?.length) throw new ApiError(404, "Channel doesn't Exist");

  return res
    .status(200)
    .json(200, new ApiResponse(200, channel[0], "User Fetched Successfully!!"));
});

const getWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",

        pipeline: [
          {
            $lookup: {
              from: "user",
              localField: "owner",
              foreignField: "_id",
              as: "owner",

              pipeline: [
                {
                  $project: {
                    fullName: 1,
                    avatar: 1,
                    username: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);

  if (!user) throw new ApiError(400, "Watch History doesn't Exist");

  res
    .send(200)
    .json(
      200,
      new ApiResponse(
        200,
        user[0].watchHistory,
        "Watch History Successfully Fetched!!",
      ),
    );
});

export {
  registerUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  changeCurrentUserPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateCoverImage,
  getUserChannelProfile,
  getWatchHistory,
};
