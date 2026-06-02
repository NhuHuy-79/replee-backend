import { deviceTokenMiddleware } from './../middlewares/fcm.middleware';
import { firebaseAuthMiddleware } from './../middlewares/auth.middleware';
import { Router } from "express"
import { pushNotification } from "../controllers/notification.controller"
import { request } from 'node:http';

const router = Router()

router.post("/send", firebaseAuthMiddleware,deviceTokenMiddleware, pushNotification)

router.get("/test", (req,res)=>{
  res.json({ok:true})
})

export default router