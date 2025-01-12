import { Router } from "express";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishAVideo,
  togglePublishStatus,
  updateVideo,
} from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/authentication.middleware.js";

const router = Router();

router.route("/").get(getAllVideos);

router.route("/publish").post(
  verifyJWT,
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },

    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo,
  togglePublishStatus
);

router.route("/:videoId").get(verifyJWT, getVideoById);

router
  .route("/:videoId/update-video")
  .patch(verifyJWT, upload.single("thumbnail"), updateVideo);

router.route("/:videoId/delete-video").delete(verifyJWT, deleteVideo);

export default router;
