import dotenv from "dotenv"
dotenv.config()

import express from "express"
import imageRoutes from "./routes/file.route"
import notificationRoutes from "./routes/notification.route"
import { deviceTokenMiddleware } from "./middlewares/fcm.middleware"
import { firebaseAuthMiddleware } from "./middlewares/auth.middleware"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello, World!")
})

app.use("/api/v1/notifications",notificationRoutes)
app.use("/api/v1/images", imageRoutes )

export default app