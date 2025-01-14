import {Router} from "express"
import { verifyJWT } from "../middlewares/authentication.middleware.js"

const router=Router()

router.use(verifyJWT)
export default router