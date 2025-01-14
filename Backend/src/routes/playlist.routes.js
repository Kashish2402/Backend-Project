import { Router } from "express";
import { verifyJWT } from "../middlewares/authentication.middleware.js";
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
  getUserPlaylist,
  removeVideoFromPlaylist,
  updatePlaylistDetails,
} from "../controllers/playlist.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-playlist").post(createPlaylist);

router.route("/user/:userId").get(getUserPlaylist);

router
  .route("/p/:playlistId")
  .get(getPlaylistById)
  .delete(deletePlaylist)
  .patch(updatePlaylistDetails);

router.route("/add/:playlistId/videoId").patch(addVideoToPlaylist);

router.route("/remove/:playlistId/videoId").patch(removeVideoFromPlaylist);

export default router;
