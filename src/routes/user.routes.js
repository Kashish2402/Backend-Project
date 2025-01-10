import { Router } from "express";
import {
  changeCurrentUserPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logOutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateCoverImage,
  updateUserAvatar,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/authentication.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser,
);


// SECURED ROUTES
router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logOutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/change-password").post(
  verifyJWT, 
  changeCurrentUserPassword
);

router
.route("/current-user")
.get(
  verifyJWT, 
  getCurrentUser
);

router
.route("/update-details")
.patch(
  verifyJWT, 
  updateAccountDetails
);

router
  .route("/avatar-update")
  .patch(
    verifyJWT, 
    upload.single("/avatar"), 
    updateUserAvatar
  );


router
  .route("/cover-image-update")
  .patch(
    verifyJWT, 
    upload.single("/coverImage"), 
    updateCoverImage);

router
.route("/c/:username")
.get(
  verifyJWT, 
  getUserChannelProfile
);

router
.route("/watch-history")
.get(
  verifyJWT, 
  getWatchHistory
);

export default router;
