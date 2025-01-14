import { Router } from "express";
import { verifyJWT } from "../middlewares/authentication.middleware.js";
import { createCommunityPost, deleteCommunityPost, getUserCommunityPost, updateCommunityPost } from "../controllers/communityPost.controller.js";


const router=Router()

router.use(verifyJWT)

router.route("/create-post").post(createCommunityPost)
router.route("/user/:userId").get(getUserCommunityPost);
router.route("/c/:postId").delete(deleteCommunityPost).patch(updateCommunityPost)


export default router