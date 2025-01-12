import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({extended:true, limit:'50mb'}))

app.use(express.static("public"))
app.use(cookieParser());

//ROUTES

import userRouter from './routes/user.routes.js'
import videoRouter from './routes/video.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'

// ROUTES DECLARATIONS
app.use("/api/v1/users",userRouter)
app.use("/api/v1/videos",videoRouter)
app.use('/api/v1/subscription',subscriptionRouter)

export { app };
