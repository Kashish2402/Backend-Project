import { Router } from "express";
import { verifyJWT } from "../middlewares/authentication.middleware.js";
import { getLikedVideos, toggleCommentLike, toggleCommunityPostLike, toggleVideoLike } from "../controllers/like.controller.js";

const router=Router()

router.use((verifyJWT))

router.route("/toggle/v/:videoId").post(toggleVideoLike)
router.route("/toggle/c/:commentId").post(toggleCommentLike)
router.route("/toggle/t/:postId").post(toggleCommunityPostLike)

router.route("/videos").get(getLikedVideos)

export default router
