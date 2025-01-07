import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token || token==='undefined') {
      throw new ApiError(401, "UNAUTHORISED REQUEST - NO TOKEN PROVIDED");
    }

    console.log("Token Extracted: ",token)

    const decodedTokenInformation = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
    );

    const user = await User.findById(decodedTokenInformation?._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(401, "INVALID ACCESS TOKEN");

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT VERIFICATION ERROR:",error)
    throw new ApiError(401, error?.message || "INVALID ACCESS TOKEN");
  }
});
