import { Router } from "express";
import { verifyJWT } from "../middlewares/authentication.middleware.js";
import {
  addComment,
  deleteComment,
  getVideoComments,
  updateComment,
} from "../controllers/comments.controller.js";

const router = new Router();

router.use(verifyJWT);

router.route("/:videoId").get(getVideoComments).post(addComment);

router.route("/c/:commentId").delete(deleteComment).patch(updateComment);

export default router;
