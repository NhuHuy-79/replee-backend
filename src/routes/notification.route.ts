import { deviceTokenMiddleware } from './../middlewares/fcm.middleware';
import { firebaseAuthMiddleware } from './../middlewares/auth.middleware';
import { Router } from "express"
import { pushNotification } from "../controllers/notification.controller"

const router = Router()

router.post("/send", deviceTokenMiddleware, firebaseAuthMiddleware, pushNotification)

export default router