import dotenv from "dotenv"
dotenv.config()

import express from "express"
import notificationRoutes from "./routes/notification.route"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello, World!")
})

app.use("/api/v1/notifications", notificationRoutes)

export default app