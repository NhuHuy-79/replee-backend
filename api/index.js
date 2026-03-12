import express from "express";
import serverless from "serverless-http";

const app = express();

app.use(express.json());

app.post("/send", async (req, res) => {
  res.json({ message: "Push sent from Vercel" });
});

export default serverless(app);