import { Router } from "express";
import { getUserChannelSubscribers } from "../controllers/subscription.controller.js";

const router=new Router()

router
    .route("/c/:channelId")
    .get(getSubscribedChannels)
    .post(toggleSubscription);

router.route("/u/:subscriberId").get(getUserChannelSubscribers);

export default router;