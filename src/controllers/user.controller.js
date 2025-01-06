import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnClodinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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

  if (existingUser) return new ApiError(409, "User Already Exist");

  // CHECK FOR IMAGES OR AVATAR

  
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;

  if(req.files && Array.isArray(req.files.coverImage) &&req.files.coverImage.length>0){
    coverImageLocalPath=req.files.coverImage[0].path
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "AVATAR REQUIRED");
  }

  // UPLOAD THEM TO CLOUDINARY IF AVAILABLE, AVATAR UPLOADED SUCCECCFULLY OR NOT

  const avatar = await uploadOnClodinary(avatarLocalPath);
  const coverImage = await uploadOnClodinary(coverImageLocalPath);

  if (!avatar) {throw new ApiError(400, "AVATAR REQUIRED")};

  // CREATE USER OBJECT - CREATE ENTRY IN DB

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    username: username.toLowerCase,
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

export { registerUser };
